import type { JobListing } from './types';

const INTERNSHIP_RE = /\b(intern(ship)?s?)\b/i;
const YEAR_2027_RE = /\b(2027|jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s*['']?27\b/i;
const US_LOCATION_RE =
  /\b(united states|usa|u\.s\.a?\.?|remote(?:\s*,?\s*(?:us|usa|u\.s\.))?|(?:,\s*)?(?:tx|ca|ny|wa|ma|il|co|ga|va|nc|nj|pa|oh|mi|fl|az|or|mn|md|mo|wi|tn|in|sc|la|ky|ok|ct|ut|ia|nv|ar|ms|ks|nm|ne|id|wv|hi|nh|me|mt|ri|de|sd|nd|ak|vt|wy|dc)\b)/i;

const AI_DOMAIN_RE =
  /\b(ai|artificial intelligence|machine learning|ml\b|deep learning|llm|nlp|data scien|quant|software engineer|python|pytorch|research|rag\b|computer vision|mlops|ai\/ml)\b/i;

const BLOCKED_DOMAINS = [
  'facebook.com',
  'instagram.com',
  'tiktok.com',
  'pinterest.com',
  'clickbank',
  'survey',
];

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

export function isLegitInternship(job: JobListing): boolean {
  const haystack = normalize(`${job.title} ${job.company} ${job.location} ${job.snippet ?? ''}`);
  const url = normalize(job.url);

  if (!INTERNSHIP_RE.test(haystack)) return false;
  if (!US_LOCATION_RE.test(haystack)) return false;
  if (!AI_DOMAIN_RE.test(haystack)) return false;
  if (BLOCKED_DOMAINS.some((d) => url.includes(d))) return false;
  if (!job.url.startsWith('http')) return false;
  if (!job.company || job.company.length < 2) return false;

  // Prefer 2027 cohorts; allow undated postings that look like rolling intern reqs.
  const mentions2027 = YEAR_2027_RE.test(haystack);
  const rollingIntern = /\b(summer|fall|spring|winter)\b/i.test(haystack) || /\bco-?op\b/i.test(haystack);
  return mentions2027 || rollingIntern;
}

export function dedupeJobs(jobs: JobListing[]): JobListing[] {
  const seen = new Set<string>();
  const out: JobListing[] = [];

  for (const job of jobs) {
    const key = normalize(`${job.title}|${job.company}|${job.url}`);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(job);
  }

  return out;
}
