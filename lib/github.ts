import { env } from "@/lib/env";
import type { GithubRepo, GithubStats } from "@/types";

const GITHUB_API = "https://api.github.com";

function authHeaders(): HeadersInit {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (env.GITHUB_TOKEN) headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  return headers;
}

export async function getGithubStats(): Promise<GithubStats | null> {
  const username = env.GITHUB_USERNAME;
  if (!username) return null;

  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: authHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();

    const reposRes = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=100`,
      { headers: authHeaders(), next: { revalidate: 3600 } }
    );
    const repos = reposRes.ok ? await reposRes.json() : [];
    const totalStars = Array.isArray(repos)
      ? repos.reduce(
          (sum: number, r: { stargazers_count?: number }) =>
            sum + (r.stargazers_count ?? 0),
          0
        )
      : 0;

    return {
      publicRepos: data.public_repos ?? 0,
      followers: data.followers ?? 0,
      following: data.following ?? 0,
      totalStars,
      createdAt: data.created_at ?? "",
    };
  } catch {
    return null;
  }
}

export async function getPinnedRepos(limit = 6): Promise<GithubRepo[]> {
  const username = env.GITHUB_USERNAME;
  if (!username) return [];

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=${limit}`,
      { headers: authHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data.map(
      (r: {
        name: string;
        description: string | null;
        html_url: string;
        stargazers_count: number;
        forks_count: number;
        language: string | null;
        updated_at: string;
      }) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        updatedAt: r.updated_at,
      })
    );
  } catch {
    return [];
  }
}
