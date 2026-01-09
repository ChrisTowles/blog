/**
 * Unit tests for ralph-loop script
 */
import { describe, it, expect, afterEach } from 'vitest'
import { existsSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
    createInitialState,
    saveState,
    loadState,
    addTaskToState,
    formatTasksForPrompt,
    buildIterationPrompt,
    extractOutputSummary,
    detectCompletionMarker,
    DEFAULT_MAX_ITERATIONS,
    DEFAULT_STATE_FILE,
    DEFAULT_COMPLETION_MARKER,
    CLAUDE_DEFAULT_ARGS,
    type RalphTask,
} from './ralph-loop'

describe('ralph-loop', () => {
    const testStateFile = join(tmpdir(), `ralph-test-${Date.now()}.json`)

    afterEach(() => {
        // Cleanup test files
        if (existsSync(testStateFile)) {
            unlinkSync(testStateFile)
        }
    })

    describe('constants', () => {
        it('should have correct default values', () => {
            expect(DEFAULT_MAX_ITERATIONS).toBe(10)
            expect(DEFAULT_STATE_FILE).toBe('ralph-state.json')
            expect(DEFAULT_COMPLETION_MARKER).toBe('RALPH_DONE')
            expect(CLAUDE_DEFAULT_ARGS).toEqual(['--print', '--output-format', 'stream-json', '--include-partial-messages', '--dangerously-skip-permissions'])
        })
    })

    describe('createInitialState', () => {
        it('should create state with correct structure', () => {
            const state = createInitialState(5)

            expect(state.version).toBe(1)
            expect(state.iteration).toBe(0)
            expect(state.maxIterations).toBe(5)
            expect(state.status).toBe('running')
            expect(state.history).toEqual([])
            expect(state.tasks).toEqual([])
            expect(state.startedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
        })

        it('should use provided maxIterations', () => {
            const state = createInitialState(20)
            expect(state.maxIterations).toBe(20)
        })
    })

    describe('saveState and loadState', () => {
        it('should save and load state correctly', () => {
            const state = createInitialState(10)
            state.iteration = 3
            state.history.push({
                iteration: 1,
                startedAt: '2026-01-08T10:00:00Z',
                completedAt: '2026-01-08T10:01:00Z',
                outputSummary: 'test output',
                markerFound: false,
            })

            saveState(state, testStateFile)
            const loaded = loadState(testStateFile)

            expect(loaded).not.toBeNull()
            expect(loaded?.iteration).toBe(3)
            expect(loaded?.history).toHaveLength(1)
            expect(loaded?.history[0].outputSummary).toBe('test output')
        })

        it('should return null for non-existent file', () => {
            const loaded = loadState('/nonexistent/path/file.json')
            expect(loaded).toBeNull()
        })

        it('should return null for invalid JSON', () => {
            writeFileSync(testStateFile, 'invalid json {{{')
            const loaded = loadState(testStateFile)
            expect(loaded).toBeNull()
        })
    })

    describe('buildIterationPrompt', () => {
        it('should include completion marker', () => {
            const prompt = buildIterationPrompt('RALPH_DONE', null)
            expect(prompt).toContain('RALPH_DONE')
        })

        it('should include state file reference', () => {
            const prompt = buildIterationPrompt('RALPH_DONE', null)
            expect(prompt).toContain('@ralph-state.json')
        })

        it('should include progress file reference', () => {
            const prompt = buildIterationPrompt('RALPH_DONE', null)
            expect(prompt).toContain('@ralph-progress.md')
        })

        it('should default to choosing task when no focusedTaskId', () => {
            const prompt = buildIterationPrompt('RALPH_DONE', null)
            expect(prompt).toContain('**Choose** which pending task')
        })

        it('should focus on specific task when focusedTaskId provided', () => {
            const prompt = buildIterationPrompt('RALPH_DONE', 3)
            expect(prompt).toContain('**Work on Task #3**')
            expect(prompt).not.toContain('**Choose** which pending task')
        })

        it('should include custom completion marker', () => {
            const prompt = buildIterationPrompt('CUSTOM_MARKER', null)
            expect(prompt).toContain('output: CUSTOM_MARKER')
        })
    })

    describe('extractOutputSummary', () => {
        it('should return last 5 lines joined', () => {
            const output = 'line 1\nline 2\nline 3\nline 4\nline 5\nline 6\nline 7'
            const summary = extractOutputSummary(output)

            expect(summary).toContain('line 3')
            expect(summary).toContain('line 7')
            expect(summary).not.toContain('line 1')
            expect(summary).not.toContain('line 2')
        })

        it('should filter empty lines', () => {
            const output = 'line 1\n\n\nline 2\n\nline 3'
            const summary = extractOutputSummary(output)

            expect(summary).toBe('line 1 line 2 line 3')
        })

        it('should truncate long output', () => {
            const longLine = 'x'.repeat(300)
            const summary = extractOutputSummary(longLine, 200)

            expect(summary.length).toBe(203) // 200 + '...'
            expect(summary.endsWith('...')).toBe(true)
        })

        it('should return "(no output)" for empty string', () => {
            expect(extractOutputSummary('')).toBe('(no output)')
            expect(extractOutputSummary('   \n  \n   ')).toBe('(no output)')
        })

        it('should use custom maxLength', () => {
            const output = 'a'.repeat(100)
            const summary = extractOutputSummary(output, 50)

            expect(summary.length).toBe(53) // 50 + '...'
        })
    })

    describe('detectCompletionMarker', () => {
        it('should detect marker in output', () => {
            expect(detectCompletionMarker('Task complete RALPH_DONE', 'RALPH_DONE')).toBe(true)
        })

        it('should return false when marker not present', () => {
            expect(detectCompletionMarker('Task still in progress', 'RALPH_DONE')).toBe(false)
        })

        it('should detect marker anywhere in output', () => {
            expect(detectCompletionMarker('start RALPH_DONE end', 'RALPH_DONE')).toBe(true)
            expect(detectCompletionMarker('RALPH_DONE', 'RALPH_DONE')).toBe(true)
            expect(detectCompletionMarker('prefix\nRALPH_DONE\nsuffix', 'RALPH_DONE')).toBe(true)
        })

        it('should work with custom markers', () => {
            expect(detectCompletionMarker('CUSTOM_DONE', 'CUSTOM_DONE')).toBe(true)
            expect(detectCompletionMarker('<done/>', '<done/>')).toBe(true)
        })

        it('should be case-sensitive', () => {
            expect(detectCompletionMarker('ralph_done', 'RALPH_DONE')).toBe(false)
        })
    })

    describe('state transitions', () => {
        it('should track iteration progress', () => {
            const state = createInitialState(5)

            expect(state.iteration).toBe(0)

            state.iteration++
            expect(state.iteration).toBe(1)

            state.history.push({
                iteration: 1,
                startedAt: new Date().toISOString(),
                completedAt: new Date().toISOString(),
                outputSummary: 'first iteration',
                markerFound: false,
            })

            expect(state.history).toHaveLength(1)
        })

        it('should update status correctly', () => {
            const state = createInitialState(5)

            expect(state.status).toBe('running')

            state.status = 'completed'
            expect(state.status).toBe('completed')

            state.status = 'max_iterations_reached'
            expect(state.status).toBe('max_iterations_reached')

            state.status = 'error'
            expect(state.status).toBe('error')
        })
    })

    describe('addTaskToState', () => {
        it('should add task with correct structure', () => {
            const state = createInitialState(10)
            const task = addTaskToState(state, 'implement feature')

            expect(task.id).toBe(1)
            expect(task.description).toBe('implement feature')
            expect(task.status).toBe('pending')
            expect(task.addedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
            expect(task.completedAt).toBeUndefined()
        })

        it('should increment task IDs', () => {
            const state = createInitialState(10)

            const task1 = addTaskToState(state, 'task 1')
            const task2 = addTaskToState(state, 'task 2')
            const task3 = addTaskToState(state, 'task 3')

            expect(task1.id).toBe(1)
            expect(task2.id).toBe(2)
            expect(task3.id).toBe(3)
            expect(state.tasks).toHaveLength(3)
        })

        it('should handle non-sequential IDs', () => {
            const state = createInitialState(10)

            // Simulate deleted task by adding with gap
            state.tasks.push({
                id: 5,
                description: 'existing task',
                status: 'done',
                addedAt: new Date().toISOString(),
            })

            const newTask = addTaskToState(state, 'new task')
            expect(newTask.id).toBe(6)
        })
    })

    describe('formatTasksForPrompt', () => {
        it('should return empty string for no tasks', () => {
            expect(formatTasksForPrompt([])).toBe('')
        })

        it('should format pending tasks correctly', () => {
            const tasks: RalphTask[] = [{
                id: 1,
                description: 'implement feature',
                status: 'pending',
                addedAt: new Date().toISOString(),
            }]

            const formatted = formatTasksForPrompt(tasks)

            expect(formatted).toContain('## Sub-Tasks')
            expect(formatted).toContain('[○] 1. implement feature (pending)')
        })

        it('should format in_progress tasks correctly', () => {
            const tasks: RalphTask[] = [{
                id: 1,
                description: 'working on it',
                status: 'in_progress',
                addedAt: new Date().toISOString(),
            }]

            const formatted = formatTasksForPrompt(tasks)
            expect(formatted).toContain('[→] 1. working on it (in_progress)')
        })

        it('should format done tasks correctly', () => {
            const tasks: RalphTask[] = [{
                id: 1,
                description: 'completed task',
                status: 'done',
                addedAt: new Date().toISOString(),
            }]

            const formatted = formatTasksForPrompt(tasks)
            expect(formatted).toContain('[✓] 1. completed task (done)')
        })

        it('should format multiple tasks', () => {
            const tasks: RalphTask[] = [
                { id: 1, description: 'task 1', status: 'done', addedAt: '' },
                { id: 2, description: 'task 2', status: 'in_progress', addedAt: '' },
                { id: 3, description: 'task 3', status: 'pending', addedAt: '' },
            ]

            const formatted = formatTasksForPrompt(tasks)

            expect(formatted).toContain('[✓] 1. task 1')
            expect(formatted).toContain('[→] 2. task 2')
            expect(formatted).toContain('[○] 3. task 3')
        })
    })

    describe('loadState backwards compatibility', () => {
        it('should add empty tasks array if missing', () => {
            // Simulate old state without tasks
            const oldState = {
                version: 1,
                task: 'old task', // legacy field
                startedAt: new Date().toISOString(),
                iteration: 0,
                maxIterations: 10,
                status: 'running',
                history: [],
            }
            writeFileSync(testStateFile, JSON.stringify(oldState))

            const loaded = loadState(testStateFile)

            expect(loaded).not.toBeNull()
            expect(loaded?.tasks).toEqual([])
        })
    })
})
