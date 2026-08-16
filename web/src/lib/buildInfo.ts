export type BuildInfo = {
  sha: string;
  shortSha: string;
  branch: string;
  timestamp: string;
};

const FALLBACK: BuildInfo = {
  sha: "local",
  shortSha: "local",
  branch: "dev",
  timestamp: new Date(0).toISOString(),
};

export async function loadBuildInfo(): Promise<BuildInfo> {
  try {
    const base = import.meta.env.BASE_URL;
    const response = await fetch(`${base}build-info.json`, { cache: "no-store" });
    if (!response.ok) {
      return FALLBACK;
    }
    const data = (await response.json()) as Partial<BuildInfo>;
    return {
      sha: data.sha ?? FALLBACK.sha,
      shortSha: data.shortSha ?? (data.sha ? data.sha.slice(0, 7) : FALLBACK.shortSha),
      branch: data.branch ?? FALLBACK.branch,
      timestamp: data.timestamp ?? FALLBACK.timestamp,
    };
  } catch {
    return FALLBACK;
  }
}
