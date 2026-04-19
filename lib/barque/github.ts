/**
 * GitHub Contents API helpers for the private barque repo.
 *
 * The barque repo is github.com/iacobp/barque (private). We fetch state
 * files (forecasts.tsv, ra/ra_log.tsv, ra/council-prompt.md, program.md,
 * historical-cases.md) and write updates (ra_log row appends + daily
 * brief markdown) back through the REST API.
 *
 * Env:
 *   GITHUB_TOKEN   — PAT with contents:write on iacobp/barque
 *   BARQUE_REPO    — defaults to "iacobp/barque"
 *   BARQUE_BRANCH  — defaults to "main"
 */

const API = "https://api.github.com";

function repo() {
  return process.env.BARQUE_REPO ?? "iacobp/barque";
}

function branch() {
  return process.env.BARQUE_BRANCH ?? "main";
}

function authHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN env var is required");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export type GHFile = {
  path: string;
  content: string;
  sha: string;
};

export async function readFile(path: string): Promise<GHFile> {
  const url = `${API}/repos/${repo()}/contents/${encodeURIComponent(path)}?ref=${branch()}`;
  const res = await fetch(url, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`GitHub read failed for ${path}: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as { content: string; sha: string; encoding: string };
  if (data.encoding !== "base64") {
    throw new Error(`GitHub returned unexpected encoding: ${data.encoding}`);
  }
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { path, content, sha: data.sha };
}

export async function writeFile(opts: {
  path: string;
  content: string;
  sha?: string | null;
  message: string;
}): Promise<{ sha: string; commitSha: string }> {
  const url = `${API}/repos/${repo()}/contents/${encodeURIComponent(opts.path)}`;
  const body: Record<string, unknown> = {
    message: opts.message,
    content: Buffer.from(opts.content, "utf8").toString("base64"),
    branch: branch(),
  };
  if (opts.sha) body.sha = opts.sha;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub write failed for ${opts.path}: ${res.status} ${text}`);
  }
  const data = (await res.json()) as {
    content: { sha: string };
    commit: { sha: string };
  };
  return { sha: data.content.sha, commitSha: data.commit.sha };
}

/**
 * Try to read a file; return null if not found (404).
 * Useful for brief files that don't exist yet.
 */
export async function tryReadFile(path: string): Promise<GHFile | null> {
  try {
    return await readFile(path);
  } catch (err) {
    if (err instanceof Error && err.message.includes("404")) return null;
    throw err;
  }
}
