import { client } from "@/lib/sanity/client";
import { latestPostsQuery } from "@/lib/sanity/queries";
import type { BlogPost } from "@/lib/types";
import LatestPostsAnimated from "./LatestPostsAnimated";

async function getLatestPosts(): Promise<BlogPost[]> {
  return client.fetch(latestPostsQuery, { limit: 3 });
}

export default async function LatestPosts() {
  const posts = await getLatestPosts();

  if (posts.length === 0) {
    return null;
  }

  return <LatestPostsAnimated posts={posts} />;
}
