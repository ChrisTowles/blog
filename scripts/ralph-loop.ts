#!/usr/bin/env -S pnpx tsx

/**
 * Ralph Loop - Iterative Claude Code execution for autonomous task completion
 *
 * Runs claude CLI in a loop, with each iteration working on one task from
 * ralph-state.json until all tasks are complete or max iterations reached.
 *
 * Usage:
 *   ./scripts/ralph-loop.ts --addTask "implement feature X"
 *   ./scripts/ralph-loop.ts --addTask "write tests for feature X"
 *   ./scripts/ralph-loop.ts                    # run loop (ralph picks tasks)
 *   ./scripts/ralph-loop.ts --taskId 3         # focus on specific task
 *
 * See also: /tt:ralph-plan command for interactive task planning
 *
 * FUTURE IMPROVEMENTS:
 * - Investigate all tasks upfront in a "planning" iteration, save that
 *   conversation/session ID, then use --resume with that session ID for
 *   all subsequent task iterations. This would give ralph persistent context
 *   about the full task list and codebase understanding across iterations.
 * - Add --resume flag to continue from a previous session
 * - Parse claude output to auto-detect which task was completed
 */

import 'zx/globals'
import type { WriteStream } from 'node:fs'
import { spawn } from 'child_process'
import { defineCommand, runMain } from 'citty'
import { z } from 'zod'

// ============================================================================
// Types
// ============================================================================

export interface IterationHistory {
    iteration: number
    startedAt: string
    completedAt: string
    outputSummary: string
    markerFound: boolean
}

export type TaskStatus = 'pending' | 'in_progress' | 'done'

export interface RalphTask {
    id: number
    description: string
    status: TaskStatus
    addedAt: string
    completedAt?: string
}

export interface RalphState {
    version: number
    tasks: RalphTask[]
    startedAt: string
    iteration: number
    maxIterations: number
    status: 'running' | 'completed' | 'max_iterations_reached' | 'error'
    history: IterationHistory[]
}

// ============================================================================
// Constants
// ============================================================================

export const DEFAULT_MAX_ITERATIONS = 10
export const DEFAULT_STATE_FILE = 'ralph-state.json'
export const DEFAULT_LOG_FILE = 'ralph-log.md'
export const DEFAULT_PROGRESS_FILE = 'ralph-progress.md'
export const DEFAULT_COMPLETION_MARKER = 'RALPH_DONE'
export const CLAUDE_DEFAULT_ARGS = ['--print', '--output-format', 'stream-json', '--include-partial-messages', '--dangerously-skip-permissions']

// ============================================================================
// Arg Validation Schema
// ============================================================================

export const ArgsSchema = z.object({
    taskId: z.string().optional()
        .refine((val: string | undefined) => !val || /^\d+$/.test(val), 'taskId must be a positive integer'),
    addTask: z.string().optional()
        .refine((val: string | undefined) => !val || val.trim().length >= 3, 'Task description must be at least 3 characters'),
    listTasks: z.boolean().default(false),
    clear: z.boolean().default(false),
    noCommit: z.boolean().default(false),
    maxIterations: z.string().default(String(DEFAULT_MAX_ITERATIONS))
        .refine((val: string) => /^\d+$/.test(val) && parseInt(val, 10) > 0, 'maxIterations must be a positive integer'),
    dryRun: z.boolean().default(false),
    claudeArgs: z.string().optional(),
    stateFile: z.string().default(DEFAULT_STATE_FILE)
        .refine((val: string) => val.endsWith('.json'), 'stateFile must be a .json file'),
    logFile: z.string().default(DEFAULT_LOG_FILE),
    completionMarker: z.string().default(DEFAULT_COMPLETION_MARKER)
        .refine((val: string) => val.length >= 3, 'completionMarker must be at least 3 characters'),
}).strict()

// citty internal keys to filter out before validation
const CITTY_INTERNAL_KEYS = ['_', 't', 'a', 'l', 'c', 'm', 'n']

export function validateArgs(args: unknown): RalphArgs {
    // Filter out citty internal keys (aliases and positionals)
    const filtered = Object.fromEntries(
        Object.entries(args as Record<string, unknown>)
            .filter(([k]) => !CITTY_INTERNAL_KEYS.includes(k))
    )
    const result = ArgsSchema.safeParse(filtered)
    if (!result.success) {
        const errors = result.error.issues.map(i => `  - ${i.path.join('.')}: ${i.message}`).join('\n')
        console.error(chalk.red('Invalid arguments:\n' + errors))
        process.exit(2)
    }
    return result.data
}

export type RalphArgs = z.infer<typeof ArgsSchema>

// ============================================================================
// State Management
// ============================================================================

export function createInitialState(maxIterations: number): RalphState {
    return {
        version: 1,
        tasks: [],
        startedAt: new Date().toISOString(),
        iteration: 0,
        maxIterations,
        status: 'running',
        history: [],
    }
}

export function saveState(state: RalphState, stateFile: string): void {
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2))
}

export function loadState(stateFile: string): RalphState | null {
    try {
        if (fs.existsSync(stateFile)) {
            const content = fs.readFileSync(stateFile, 'utf-8')
            const state = JSON.parse(content) as RalphState
            // Ensure tasks array exists for backwards compatibility
            if (!state.tasks) {
                state.tasks = []
            }
            return state
        }
    }
    catch {
        return null
    }
    return null
}

export function addTaskToState(state: RalphState, description: string): RalphTask {
    const nextId = state.tasks.length > 0
        ? Math.max(...state.tasks.map(t => t.id)) + 1
        : 1

    const newTask: RalphTask = {
        id: nextId,
        description,
        status: 'pending',
        addedAt: new Date().toISOString(),
    }

    state.tasks.push(newTask)
    return newTask
}

export function formatTasksForPrompt(tasks: RalphTask[]): string {
    if (tasks.length === 0) {
        return ''
    }

    const statusIcon = (status: TaskStatus): string => {
        switch (status) {
            case 'done': return '✓'
            case 'in_progress': return '→'
            case 'pending': return '○'
        }
    }

    const lines = tasks.map(t =>
        `[${statusIcon(t.status)}] ${t.id}. ${t.description} (${t.status})`
    )

    return `## Sub-Tasks
Track progress on these sub-tasks. Mark them as done when completed.

${lines.join('\n')}`
}

// ============================================================================
// Prompt Building
// ============================================================================

export interface BuildPromptOptions {
    completionMarker: string
    stateFile: string
    progressFile: string
    focusedTaskId: number | null
    skipCommit?: boolean
}

export function buildIterationPrompt({ completionMarker, stateFile, progressFile, focusedTaskId, skipCommit = false }: BuildPromptOptions): string {
    // prompt inspired by https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum#2-start-with-hitl-then-go-afk

    let step = 1

    return `
Review the state and progress files. 

state_file: @${stateFile}
progress_file: @${progressFile}

Then:



${step++}. ${focusedTaskId
        ? `**Work on Task #${focusedTaskId}** (you've been asked to focus on this one).`
        : `**Choose** which pending task to work on next based on YOUR judgment of priority/dependencies.`}
${step++}. Work on that single task.
${step++}. Run type checks and tests.
${step++}. Mark the task "done" in @${stateFile} (update status field).
${step++}. Update @${progressFile} with what you did.
${skipCommit ? '' : `${step++}. Make a git commit.`}

**ONE TASK PER ITERATION**

When ALL tasks are done, Output: <promise>${completionMarker}</promise>
`
}



// ============================================================================
// Output Summary
// ============================================================================

export function extractOutputSummary(output: string, maxLength: number = 2000): string {
    const lines = output.split('\n').filter(l => l.trim()).slice(-5)
    let summary = lines.join(' ').trim()

    if (summary.length > maxLength) {
        summary = summary.substring(0, maxLength) + '...'
    }

    return summary || '(no output)'
}

// ============================================================================
// Marker Detection
// ============================================================================

export function detectCompletionMarker(output: string, marker: string): boolean {
    return output.includes(marker)
}

// ============================================================================
// Execution
// ============================================================================

export async function checkClaudeCli(): Promise<boolean> {
    try {
        await $`which claude`.quiet()
        return true
    }
    catch {
        return false
    }
}

interface StreamEvent {
    type: string
    event?: {
        type: string
        delta?: { text?: string }
    }
    result?: string
}

function parseStreamLine(line: string): string | null {
    if (!line.trim()) return null
    try {
        const data = JSON.parse(line) as StreamEvent
        // Extract text from streaming deltas
        if (data.type === 'stream_event' && data.event?.type === 'content_block_delta') {
            return data.event.delta?.text || null
        }
        // Add newline after content block ends
        if (data.type === 'stream_event' && data.event?.type === 'content_block_stop') {
            return '\n'
        }
        // Also capture final result
        if (data.type === 'result' && data.result) {
            return `\n[Result: ${data.result.substring(0, 100)}${data.result.length > 100 ? '...' : ''}]\n`
        }
    } catch {
        // Not JSON, return raw
        return line
    }
    return null
}

export async function runIteration(
    prompt: string,
    claudeArgs: string[],
    logStream?: WriteStream,
): Promise<{ output: string, exitCode: number }> {
    const allArgs = [...CLAUDE_DEFAULT_ARGS, ...claudeArgs, prompt]

    let output = ''
    let lineBuffer = ''

    return new Promise((resolve) => {
        const proc = spawn('claude', allArgs, {
            stdio: ['inherit', 'pipe', 'pipe'],
        })

        proc.stdout.on('data', (chunk: Buffer) => {
            const text = chunk.toString()
            lineBuffer += text

            // Process complete lines
            const lines = lineBuffer.split('\n')
            lineBuffer = lines.pop() || '' // Keep incomplete line in buffer

            for (const line of lines) {
                const parsed = parseStreamLine(line)
                if (parsed) {
                    process.stdout.write(parsed)
                    logStream?.write(parsed)
                    output += parsed
                }
            }
        })

        proc.stderr.on('data', (chunk: Buffer) => {
            const text = chunk.toString()
            process.stderr.write(text)
            logStream?.write(text)
            output += text
        })

        proc.on('close', (code: number | null) => {
            // Process any remaining buffer
            if (lineBuffer) {
                const parsed = parseStreamLine(lineBuffer)
                if (parsed) {
                    process.stdout.write(parsed)
                    logStream?.write(parsed)
                    output += parsed
                }
            }
            resolve({ output, exitCode: code ?? 0 })
        })

        proc.on('error', (err: Error) => {
            console.error(chalk.red(`Error running claude: ${err}`))
            logStream?.write(`Error running claude: ${err}\n`)
            resolve({ output, exitCode: 1 })
        })
    })
}

// ============================================================================
// Main Command
// ============================================================================

const main = defineCommand({
    meta: {
        name: 'ralph-loop',
        version: '1.0.0',
        description: 'Run Claude Code CLI in a loop until task completion',
    },
    args: {
        taskId: {
            type: 'string',
            alias: 't',
            description: 'Force focus on a specific task ID (optional - ralph picks otherwise)',
        },
        addTask: {
            type: 'string',
            alias: 'a',
            description: 'Add a sub-task to the state file',
        },
        listTasks: {
            type: 'boolean',
            alias: 'l',
            default: false,
            description: 'List all tasks in the state file',
        },
        clear: {
            type: 'boolean',
            alias: 'c',
            default: false,
            description: 'Clear all ralph files (state, log, progress)',
        },
        noCommit: {
            type: 'boolean',
            default: false,
            description: 'Skip git commit after each task',
        },
        maxIterations: {
            type: 'string',
            alias: 'm',
            default: String(DEFAULT_MAX_ITERATIONS),
            description: `Max iterations (default: ${DEFAULT_MAX_ITERATIONS})`,
        },
        dryRun: {
            type: 'boolean',
            alias: 'n',
            default: false,
            description: 'Show config without executing',
        },
        claudeArgs: {
            type: 'string',
            description: 'Extra args to pass to claude CLI (space-separated)',
        },
        stateFile: {
            type: 'string',
            default: DEFAULT_STATE_FILE,
            description: `State file path (default: ${DEFAULT_STATE_FILE})`,
        },
        logFile: {
            type: 'string',
            default: DEFAULT_LOG_FILE,
            description: `Log file path (default: ${DEFAULT_LOG_FILE})`,
        },
        completionMarker: {
            type: 'string',
            default: DEFAULT_COMPLETION_MARKER,
            description: `Completion marker (default: ${DEFAULT_COMPLETION_MARKER})`,
        },
    },
    async run({ args }) {
        const validatedArgs = validateArgs(args)
        const maxIterations = parseInt(validatedArgs.maxIterations, 10)
        const extraClaudeArgs = validatedArgs.claudeArgs?.split(' ').filter(Boolean) || []

        // Handle --clear: remove all ralph files
        if (validatedArgs.clear) {
            const files = [validatedArgs.stateFile, validatedArgs.logFile, DEFAULT_PROGRESS_FILE]
            let deleted = 0

            for (const file of files) {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file)
                    console.log(chalk.green(`✓ Deleted ${file}`))
                    deleted++
                } else {
                    console.log(chalk.dim(`  Skipped ${file} (not found)`))
                }
            }

            console.log(chalk.dim(`\nCleared ${deleted} file(s)`))
            process.exit(0)
        }

        // Handle --addTask: add a task to state file
        if (validatedArgs.addTask !== undefined) {
            const description = String(validatedArgs.addTask).trim()

            if (!description || description.length < 3) {
                console.error(chalk.red('Error: Task description too short (min 3 chars)'))
                console.error(chalk.dim('Usage: --addTask "description" or -a "description"'))
                process.exit(2)
            }

            let state = loadState(validatedArgs.stateFile)

            if (!state) {
                state = createInitialState(maxIterations)
            }

            const newTask = addTaskToState(state, description)
            saveState(state, validatedArgs.stateFile)

            console.log(chalk.green(`✓ Added task #${newTask.id}: ${newTask.description}`))
            console.log(chalk.dim(`State saved to: ${validatedArgs.stateFile}`))
            console.log(chalk.dim(`Total tasks: ${state.tasks.length}`))
            process.exit(0)
        }

        // Handle --listTasks: show all tasks
        if (validatedArgs.listTasks) {
            const state = loadState(validatedArgs.stateFile)

            if (!state) {
                console.log(chalk.yellow(`No state file found at: ${validatedArgs.stateFile}`))
                process.exit(0)
            }

            if (state.tasks.length === 0) {
                console.log(chalk.yellow('No tasks in state file.'))
                console.log(chalk.dim(`Use --addTask "description" to add tasks.`))
                process.exit(0)
            }

            console.log(chalk.bold('\nTasks:\n'))
            for (const task of state.tasks) {
                const statusColor = task.status === 'done' ? chalk.green
                    : task.status === 'in_progress' ? chalk.yellow
                    : chalk.dim
                const icon = task.status === 'done' ? '✓'
                    : task.status === 'in_progress' ? '→'
                    : '○'
                console.log(statusColor(`  ${icon} ${task.id}. ${task.description} (${task.status})`))
            }
            console.log()
            process.exit(0)
        }

        // Parse taskId if provided
        const focusedTaskId = validatedArgs.taskId ? parseInt(validatedArgs.taskId, 10) : null

        // Load existing state
        let state = loadState(validatedArgs.stateFile)

        // Validate state and tasks exist
        if (!state) {
            console.error(chalk.red(`Error: No state file found at: ${validatedArgs.stateFile}`))
            console.error(chalk.dim('Use --addTask "description" to add tasks first.'))
            process.exit(2)
        }

        const pendingTasks = state.tasks.filter(t => t.status !== 'done')
        if (pendingTasks.length === 0) {
            console.log(chalk.green('✅ All tasks are done!'))
            process.exit(0)
        }

        // Validate focused task exists if specified
        if (focusedTaskId !== null) {
            const focusedTask = state.tasks.find(t => t.id === focusedTaskId)
            if (!focusedTask) {
                console.error(chalk.red(`Error: Task #${focusedTaskId} not found`))
                console.error(chalk.dim('Use --listTasks to see available tasks.'))
                process.exit(2)
            }
            if (focusedTask.status === 'done') {
                console.log(chalk.yellow(`Task #${focusedTaskId} is already done.`))
                process.exit(0)
            }
        }

        // Dry run mode
        if (validatedArgs.dryRun) {
            console.log(chalk.bold('\n=== DRY RUN ===\n'))
            console.log(chalk.cyan('Config:'))
            console.log(`  Focus: ${focusedTaskId ? `Task #${focusedTaskId}` : 'Ralph picks'}`)
            console.log(`  Max iterations: ${maxIterations}`)
            console.log(`  State file: ${validatedArgs.stateFile}`)
            console.log(`  Log file: ${validatedArgs.logFile}`)
            console.log(`  Completion marker: ${validatedArgs.completionMarker}`)
            console.log(`  No commit: ${validatedArgs.noCommit}`)
            console.log(`  Claude args: ${[...CLAUDE_DEFAULT_ARGS, ...extraClaudeArgs].join(' ')}`)
            console.log(`  Pending tasks: ${pendingTasks.length}`)

            console.log(chalk.cyan('\nTasks:'))
            for (const t of state.tasks) {
                const icon = t.status === 'done' ? '✓' : t.status === 'in_progress' ? '→' : '○'
                const focus = focusedTaskId === t.id ? chalk.cyan(' ← FOCUS') : ''
                console.log(`  ${icon} ${t.id}. ${t.description} (${t.status})${focus}`)
            }

            console.log(chalk.bold('\n=== END DRY RUN ===\n'))
            process.exit(0)
        }

        // Check claude CLI is available
        if (!await checkClaudeCli()) {
            console.error(chalk.red('Error: claude CLI not found in PATH'))
            console.error(chalk.yellow('Install Claude Code: https://docs.anthropic.com/en/docs/claude-code'))
            process.exit(2)
        }

        // Update state for this run
        state.maxIterations = maxIterations
        state.status = 'running'

        // Create log stream (append mode)
        const logStream = fs.createWriteStream(validatedArgs.logFile, { flags: 'a' })
        const _logLine = (msg: string) => {
            console.log(msg)
            logStream.write(msg + '\n')
        }

        const pending = state.tasks.filter(t => t.status === 'pending').length
        const done = state.tasks.filter(t => t.status === 'done').length

        logStream.write(`\n${'='.repeat(60)}\n`)
        logStream.write(`Ralph Loop Started: ${new Date().toISOString()}\n`)
        logStream.write(`${'='.repeat(60)}\n\n`)

        console.log(chalk.bold.blue('\n🔄 Ralph Loop Starting\n'))
        console.log(chalk.dim(`Focus: ${focusedTaskId ? `Task #${focusedTaskId}` : 'Ralph picks'}`))
        console.log(chalk.dim(`Max iterations: ${maxIterations}`))
        console.log(chalk.dim(`Log file: ${validatedArgs.logFile}`))
        console.log(chalk.dim(`No commit: ${validatedArgs.noCommit}`))
        console.log(chalk.dim(`Tasks: ${state.tasks.length} (${done} done, ${pending} pending)`))
        console.log()

        logStream.write(`Focus: ${focusedTaskId ? `Task #${focusedTaskId}` : 'Ralph picks'}\n`)
        logStream.write(`Max iterations: ${maxIterations}\n`)
        logStream.write(`Tasks: ${state.tasks.length} (${done} done, ${pending} pending)\n\n`)

        // Handle SIGINT gracefully
        let interrupted = false
        process.on('SIGINT', () => {
            if (interrupted) {
                logStream.end()
                process.exit(130)
            }
            interrupted = true
            const msg = '\n\nInterrupted. Press Ctrl+C again to force exit.\n'
            console.log(chalk.yellow(msg))
            logStream.write(msg)
            state.status = 'error'
            saveState(state, validatedArgs.stateFile)
        })

        // Main loop
        while (state.iteration < maxIterations && !interrupted) {
            state.iteration++

            const iterHeader = `\n━━━ Iteration ${state.iteration}/${maxIterations} ━━━\n`
            console.log(chalk.bold.cyan(iterHeader))
            logStream.write(iterHeader)

            const iterationStart = new Date().toISOString()
            const prompt = buildIterationPrompt({
                completionMarker: validatedArgs.completionMarker,
                stateFile: validatedArgs.stateFile,
                progressFile: DEFAULT_PROGRESS_FILE,
                focusedTaskId,
                skipCommit: validatedArgs.noCommit,
            })

            // Log the prompt
            logStream.write(`\n--- Prompt ---\n${prompt}\n--- End Prompt ---\n\n`)

            const { output } = await runIteration(prompt, extraClaudeArgs, logStream)

            const iterationEnd = new Date().toISOString()
            const markerFound = detectCompletionMarker(output, validatedArgs.completionMarker)

            // Record history
            state.history.push({
                iteration: state.iteration,
                startedAt: iterationStart,
                completedAt: iterationEnd,
                outputSummary: extractOutputSummary(output),
                markerFound,
            })

            // Save state after each iteration
            saveState(state, validatedArgs.stateFile)

            // Log iteration summary
            const summaryMsg = `\n━━━ Iteration ${state.iteration} Summary ━━━\nMarker found: ${markerFound ? 'yes' : 'no'}\n`
            console.log(chalk.dim(`\n━━━ Iteration ${state.iteration} Summary ━━━`))
            console.log(chalk.dim(`Marker found: ${markerFound ? chalk.green('yes') : chalk.yellow('no')}`))
            logStream.write(summaryMsg)

            // Check completion
            if (markerFound) {
                state.status = 'completed'
                saveState(state, validatedArgs.stateFile)
                const doneMsg = `\n✅ Task completed after ${state.iteration} iteration(s)\n`
                console.log(chalk.bold.green(doneMsg))
                logStream.write(doneMsg)
                logStream.end()
                process.exit(0)
            }
        }

        // Max iterations reached
        if (!interrupted) {
            state.status = 'max_iterations_reached'
            saveState(state, validatedArgs.stateFile)
            const maxMsg = `\n⚠️  Max iterations (${maxIterations}) reached without completion\n`
            console.log(chalk.bold.yellow(maxMsg))
            console.log(chalk.dim(`State saved to: ${validatedArgs.stateFile}`))
            logStream.write(maxMsg)
            logStream.end()
            process.exit(1)
        }
    },
})

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
    runMain(main)
}

export { main }
