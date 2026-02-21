/**
 * Shared types for GitHub dashboard
 * Used by both client and server
 */

export interface GitHubIssue {
  number: number;
  title: string;
  state: 'open' | 'closed';
  labels: string[];
  created_at: string;
  closed_at: string | null;
  /** Time to close in hours, null if still open */
  hours_to_close: number | null;
}

export interface GitHubLabel {
  name: string;
  color: string;
  count: number;
}

export interface GitHubDashboardData {
  repo: string;
  issues: GitHubIssue[];
  labels: GitHubLabel[];
  summary: {
    total_issues: number;
    open_issues: number;
    closed_issues: number;
    avg_hours_to_close: number | null;
    median_hours_to_close: number | null;
  };
  /** Issues closed per month: { "2025-01": 5, ... } */
  closed_per_month: Record<string, number>;
  /** Issues opened per month */
  opened_per_month: Record<string, number>;
  fetched_at: string;
}
