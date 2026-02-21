import type { GitHubDashboardData, GitHubIssue, GitHubLabel } from '~~/shared/github-types';

interface GitHubApiIssue {
  number: number;
  title: string;
  state: string;
  labels: Array<{ name: string; color: string }>;
  created_at: string;
  closed_at: string | null;
  pull_request?: unknown;
}

const REPO = 'ChrisTowles/blog';

async function fetchAllIssues(): Promise<GitHubApiIssue[]> {
  const all: GitHubApiIssue[] = [];
  const perPage = 100;

  for (const state of ['open', 'closed'] as const) {
    let page = 1;
    while (true) {
      const url = `https://api.github.com/repos/${REPO}/issues?state=${state}&per_page=${perPage}&page=${page}&sort=created&direction=desc`;
      const response = await fetch(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'chris-towles-blog',
        },
      });

      if (!response.ok) {
        throw createError({
          statusCode: response.status,
          statusMessage: `GitHub API error: ${response.statusText}`,
        });
      }

      const issues: GitHubApiIssue[] = await response.json();
      // Filter out pull requests (GitHub includes them in /issues)
      const realIssues = issues.filter((i) => !i.pull_request);
      all.push(...realIssues);

      if (issues.length < perPage) break;
      page++;
    }
  }

  return all;
}

function computeHoursToClose(created: string, closed: string | null): number | null {
  if (!closed) return null;
  const diff = new Date(closed).getTime() - new Date(created).getTime();
  return Math.round((diff / (1000 * 60 * 60)) * 10) / 10;
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
}

function toMonthKey(dateStr: string): string {
  return dateStr.slice(0, 7); // "2025-01"
}

export default defineEventHandler(async (event): Promise<GitHubDashboardData> => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const rawIssues = await fetchAllIssues();

  const issues: GitHubIssue[] = rawIssues.map((i) => ({
    number: i.number,
    title: i.title,
    state: i.state as 'open' | 'closed',
    labels: i.labels.map((l) => l.name),
    created_at: i.created_at,
    closed_at: i.closed_at,
    hours_to_close: computeHoursToClose(i.created_at, i.closed_at),
  }));

  // Label counts
  const labelMap = new Map<string, { color: string; count: number }>();
  for (const raw of rawIssues) {
    for (const label of raw.labels) {
      const existing = labelMap.get(label.name);
      if (existing) {
        existing.count++;
      } else {
        labelMap.set(label.name, { color: `#${label.color}`, count: 1 });
      }
    }
  }
  const labels: GitHubLabel[] = Array.from(labelMap.entries())
    .map(([name, { color, count }]) => ({ name, color, count }))
    .sort((a, b) => b.count - a.count);

  // Summary
  const closedIssues = issues.filter((i) => i.state === 'closed');
  const closeTimes = closedIssues
    .map((i) => i.hours_to_close)
    .filter((h): h is number => h !== null);

  const summary = {
    total_issues: issues.length,
    open_issues: issues.filter((i) => i.state === 'open').length,
    closed_issues: closedIssues.length,
    avg_hours_to_close:
      closeTimes.length > 0
        ? Math.round((closeTimes.reduce((a, b) => a + b, 0) / closeTimes.length) * 10) / 10
        : null,
    median_hours_to_close: median(closeTimes),
  };

  // Monthly aggregation
  const closedPerMonth: Record<string, number> = {};
  const openedPerMonth: Record<string, number> = {};

  for (const issue of issues) {
    const openMonth = toMonthKey(issue.created_at);
    openedPerMonth[openMonth] = (openedPerMonth[openMonth] || 0) + 1;

    if (issue.closed_at) {
      const closeMonth = toMonthKey(issue.closed_at);
      closedPerMonth[closeMonth] = (closedPerMonth[closeMonth] || 0) + 1;
    }
  }

  return {
    repo: REPO,
    issues,
    labels,
    summary,
    closed_per_month: closedPerMonth,
    opened_per_month: openedPerMonth,
    fetched_at: new Date().toISOString(),
  };
});
