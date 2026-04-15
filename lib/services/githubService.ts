import "server-only";

const GITHUB_USERNAME = "ShuhaiYu";

export interface GitHubCommit {
  message: string;
  repo: string;
  date: string;
  sha: string;
  url: string;
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  prEvents: number;
  recentCommits: GitHubCommit[];
}

const EMPTY: GitHubStats = {
  publicRepos: 0,
  followers: 0,
  following: 0,
  prEvents: 0,
  recentCommits: [],
};

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  const base: HeadersInit = { Accept: "application/vnd.github+json" };
  if (token) (base as Record<string, string>).Authorization = `Bearer ${token}`;
  return base;
}

async function fetchJson<T>(url: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: headers(),
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

interface GitHubUserResponse {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubEventCommit {
  sha: string;
  message: string;
  url: string;
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { commits?: GitHubEventCommit[] };
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [user, events] = await Promise.all([
    fetchJson<GitHubUserResponse>(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      300,
    ),
    fetchJson<GitHubEvent[]>(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      300,
    ),
  ]);

  if (!user) return EMPTY;

  const eventList = events ?? [];

  const prEvents = eventList.filter(
    (e) => e.type === "PullRequestEvent",
  ).length;

  const recentCommits: GitHubCommit[] = eventList
    .filter((e) => e.type === "PushEvent" && e.payload.commits)
    .flatMap((e) =>
      (e.payload.commits ?? []).map((c) => ({
        message: c.message.split("\n")[0],
        repo: e.repo.name,
        date: e.created_at,
        sha: c.sha,
        url: `https://github.com/${e.repo.name}/commit/${c.sha}`,
      })),
    )
    .slice(0, 5);

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    prEvents,
    recentCommits,
  };
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
