import { fetchGitHubStats, relativeTime } from "@/lib/services/githubService";
import { NOW } from "@/lib/now";
import NowWidgetClient from "./NowWidgetClient";

export default async function NowWidget() {
  const stats = await fetchGitHubStats();
  const latest = stats.recentCommits[0];
  return (
    <NowWidgetClient
      now={NOW}
      latestCommit={
        latest
          ? {
              message: latest.message,
              repo: latest.repo,
              ago: relativeTime(latest.date),
              url: latest.url,
            }
          : null
      }
    />
  );
}
