import "server-only";

const GITHUB_USERNAME = "ShuhaiYu";

export interface GitHubCommit {
  message: string;
  repo: string;
  date: string;
  sha: string;
  url: string;
  isPrivate: boolean;
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalCommits: number;
  totalPRs: number;
  recentCommits: GitHubCommit[];
}

const EMPTY: GitHubStats = {
  publicRepos: 0,
  followers: 0,
  following: 0,
  totalCommits: 0,
  totalPRs: 0,
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
  public: boolean;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: GitHubEventCommit[];
    head?: string;
    ref?: string;
    size?: number;
    distinct_size?: number;
  };
}

interface GraphQLContribResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
      };
    };
  };
}

async function fetchContributionTotals(): Promise<{
  totalCommits: number;
  totalPRs: number;
} | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              totalCommitContributions
              totalPullRequestContributions
            }
          }
        }`,
        variables: { login: GITHUB_USERNAME },
      }),
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as GraphQLContribResponse;
    const c = json.data?.user?.contributionsCollection;
    if (!c) return null;
    return {
      totalCommits: c.totalCommitContributions,
      totalPRs: c.totalPullRequestContributions,
    };
  } catch {
    return null;
  }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const hasToken = Boolean(process.env.GITHUB_TOKEN);
  const eventsUrl = hasToken
    ? `https://api.github.com/users/${GITHUB_USERNAME}/events`
    : `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;

  const [user, events, contribTotals] = await Promise.all([
    fetchJson<GitHubUserResponse>(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      300,
    ),
    fetchJson<GitHubEvent[]>(eventsUrl, 300),
    fetchContributionTotals(),
  ]);

  if (!user) return EMPTY;
  const eventList = events ?? [];

  const fallbackPrCount = eventList.filter(
    (e) => e.type === "PullRequestEvent",
  ).length;
  const fallbackCommitCount = eventList
    .filter((e) => e.type === "PushEvent")
    .reduce((sum, e) => sum + (e.payload.distinct_size ?? e.payload.size ?? 1), 0);

  const recentCommits: GitHubCommit[] = eventList
    .filter((e) => e.type === "PushEvent")
    .flatMap((e) => pushEventToCommits(e))
    .slice(0, 5);

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    totalCommits: contribTotals?.totalCommits ?? fallbackCommitCount,
    totalPRs: contribTotals?.totalPRs ?? fallbackPrCount,
    recentCommits,
  };
}

function pushEventToCommits(e: GitHubEvent): GitHubCommit[] {
  const isPrivate = e.public === false;
  const repoLabel = isPrivate ? "Private repo" : e.repo.name;
  const branch = e.payload.ref?.replace(/^refs\/heads\//, "") ?? "main";

  // Authenticated API returns full commits[] array
  if (e.payload.commits && e.payload.commits.length > 0) {
    return e.payload.commits.map((c) => ({
      message: isPrivate ? "Private work" : c.message.split("\n")[0],
      repo: repoLabel,
      date: e.created_at,
      sha: c.sha,
      url: isPrivate
        ? `https://github.com/${GITHUB_USERNAME}`
        : `https://github.com/${e.repo.name}/commit/${c.sha}`,
      isPrivate,
    }));
  }

  // Anonymous fallback — payload has only head SHA + ref
  if (e.payload.head) {
    const count = e.payload.distinct_size ?? e.payload.size ?? 1;
    const message = isPrivate
      ? "Private work"
      : `Pushed ${count} commit${count === 1 ? "" : "s"} to ${branch}`;
    return [
      {
        message,
        repo: repoLabel,
        date: e.created_at,
        sha: e.payload.head,
        url: isPrivate
          ? `https://github.com/${GITHUB_USERNAME}`
          : `https://github.com/${e.repo.name}/commit/${e.payload.head}`,
        isPrivate,
      },
    ];
  }

  return [];
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
