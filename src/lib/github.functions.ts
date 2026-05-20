import { createServerFn } from "@tanstack/react-start";
import { plugins } from "@/data/plugins";

export type RepoStats = {
  slug: string;
  stars: string | null;
  version: string | null;
  releaseUrl: string | null;
  downloadUrl: string | null;
  publishedAt: string | null;
  error?: string;
};

function parseRepo(url: string): { owner: string; repo: string } | null {
  const m = url.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, "") };
}

function formatStars(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k";
  return String(n);
}

async function ghFetch(path: string, token?: string) {
  return fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "archivio-ext",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

async function fetchOne(slug: string, github: string, token?: string): Promise<RepoStats> {
  const base: RepoStats = {
    slug,
    stars: null,
    version: null,
    releaseUrl: null,
    downloadUrl: null,
    publishedAt: null,
  };
  const parsed = parseRepo(github);
  if (!parsed) return { ...base, error: "invalid github url" };

  try {
    const [repoRes, relRes] = await Promise.all([
      ghFetch(`/repos/${parsed.owner}/${parsed.repo}`, token),
      ghFetch(`/repos/${parsed.owner}/${parsed.repo}/releases/latest`, token),
    ]);

    if (repoRes.ok) {
      const data = (await repoRes.json()) as { stargazers_count?: number; default_branch?: string };
      base.stars = typeof data.stargazers_count === "number" ? formatStars(data.stargazers_count) : null;
      base.downloadUrl = `https://github.com/${parsed.owner}/${parsed.repo}/archive/refs/heads/${data.default_branch ?? "main"}.zip`;
    }

    if (relRes.ok) {
      const data = (await relRes.json()) as {
        tag_name?: string;
        name?: string;
        html_url?: string;
        published_at?: string;
        zipball_url?: string;
        assets?: Array<{ browser_download_url: string; name: string }>;
      };
      base.version = (data.tag_name ?? data.name ?? "").replace(/^v/, "") || null;
      base.releaseUrl = data.html_url ?? null;
      base.publishedAt = data.published_at ?? null;
      const zipAsset = data.assets?.find((a) => a.name.toLowerCase().endsWith(".zip"));
      base.downloadUrl = zipAsset?.browser_download_url ?? data.zipball_url ?? base.downloadUrl;
    }

    return base;
  } catch (err) {
    return { ...base, error: err instanceof Error ? err.message : "fetch failed" };
  }
}

export const getRepoStats = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<RepoStats | null> => {
    const plugin = plugins.find((p) => p.slug === data.slug);
    if (!plugin) return null;
    return fetchOne(plugin.slug, plugin.github, process.env.GITHUB_TOKEN);
  });

export const getAllRepoStats = createServerFn({ method: "GET" }).handler(async (): Promise<
  Record<string, RepoStats>
> => {
  const token = process.env.GITHUB_TOKEN;
  const results = await Promise.all(plugins.map((p) => fetchOne(p.slug, p.github, token)));
  return Object.fromEntries(results.map((r) => [r.slug, r]));
});
