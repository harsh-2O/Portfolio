import { findInternships } from '../_lib/internship/search';
import { sendInternshipAlert } from '../_lib/internship/email';
import { loadSeenIds, rememberIds, splitNewJobs } from '../_lib/internship/store';
import type { ScanResult } from '../_lib/internship/types';

type Req = { headers: Record<string, string | string[] | undefined> };
type Res = {
  status: (code: number) => { json: (body: unknown) => void };
};

/**
 * Server-only hourly internship scanner.
 * Not bundled into the React app — does not appear in browser DevTools on normal page visits.
 */
export default async function handler(req: Req, res: Res) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${secret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  if (!process.env.RAPIDAPI_KEY && !process.env.USAJOBS_API_KEY) {
    return res.status(500).json({
      error: 'Missing job API keys. Set RAPIDAPI_KEY and/or USAJOBS_API_KEY on Vercel.',
    });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: 'Missing RESEND_API_KEY on Vercel. Emails go to hdmehta406@gmail.com via Resend.',
    });
  }

  try {
    const { jobs, queries } = await findInternships();
    const hasDedupStore = Boolean(
      process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
    );
    const seen = hasDedupStore ? await loadSeenIds() : new Set<string>();
    let fresh = splitNewJobs(jobs, seen);

    if (!hasDedupStore) {
      const cutoff = Date.now() - 24 * 60 * 60 * 1000;
      fresh = fresh.filter((job) => {
        if (!job.postedAt) return false;
        return new Date(job.postedAt).getTime() >= cutoff;
      });
    }

    let emailSent = false;
    if (fresh.length > 0) {
      emailSent = await sendInternshipAlert(fresh);
      if (emailSent) await rememberIds(fresh.map((job) => job.id));
    }

    const payload: ScanResult = {
      scannedAt: new Date().toISOString(),
      totalFound: jobs.length,
      newCount: fresh.length,
      emailSent,
      queries,
    };

    return res.status(200).json(payload);
  } catch (error) {
    console.error('internship-scan failed', error);
    return res.status(500).json({ error: 'Scan failed' });
  }
}
