import type { JobListing } from './types';

const SEEN_KEY = 'internship:seen:2027';

async function upstash(command: (string | number)[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  if (!res.ok) return null;
  return res.json();
}

export async function loadSeenIds(): Promise<Set<string>> {
  const result = await upstash(['SMEMBERS', SEEN_KEY]);
  const members = (result as { result?: string[] } | null)?.result ?? [];
  return new Set(members);
}

export async function rememberIds(ids: string[]) {
  if (!ids.length) return;
  await upstash(['SADD', SEEN_KEY, ...ids]);
}

export function splitNewJobs(jobs: JobListing[], seen: Set<string>) {
  const fresh = jobs.filter((job) => !seen.has(job.id));
  return fresh;
}
