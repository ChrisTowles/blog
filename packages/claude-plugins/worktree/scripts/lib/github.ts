import { execFileSync } from 'node:child_process'

export interface GithubIssue {
    number: number
    title: string
    state: string
}

export function fetchIssue(issueNumber: number): GithubIssue | null {
    try {
        const output = execFileSync('gh', [
            'issue', 'view', String(issueNumber),
            '--json', 'number,title,state'
        ], { encoding: 'utf-8', stdio: 'pipe' })

        return JSON.parse(output) as GithubIssue
    } catch {
        return null
    }
}

export function slugify(title: string, maxLength: number = 30): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, maxLength)
        .replace(/-$/, '')
}

export function createBranchName(issueNumber: number, title: string): string {
    const slug = slugify(title)
    return `feature/${issueNumber}-${slug}`
}

export function isGithubRepo(): boolean {
    try {
        const output = execFileSync('gh', ['repo', 'view', '--json', 'name'], {
            encoding: 'utf-8',
            stdio: 'pipe'
        })
        return output.trim().length > 0
    } catch {
        return false
    }
}
