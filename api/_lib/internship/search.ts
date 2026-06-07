import type { JobListing } from './types';
import { dedupeJobs, isLegitInternship } from './filters';

const SEARCH_QUERIES = [
  'AI machine learning intern United States 2027',
  'data science intern United States 2027',
  'quant developer intern United States 2027',
  'software engineer AI intern United States 2027',
  'LLM NLP research intern United States 2027',
  'computer science intern AI United States summer 2027',
];

function stableId(title: string, company: string, url: string) {
  return Buffer.from(`${title}|${company}|${url}`).toString('base64url');
}

async function searchJSearch(query: string, apiKey: string): Promise<JobListing[]> {
  const url = new URL('https://jsearch.p.rapidapi.com/search');
  url.searchParams.set('query', query);
  url.searchParams.set('page', '1');
  url.searchParams.set('num_pages', '1');
  url.searchParams.set('date_posted', 'month');
  url.searchParams.set('country', 'us');

  const res = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  });

  if (!res.ok) return [];

  const json = (await res.json()) as {
    data?: Array<{
      job_title?: string;
      employer_name?: string;
      job_city?: string;
      job_state?: string;
      job_country?: string;
      job_apply_link?: string;
      job_google_link?: string;
      job_posted_at_datetime_utc?: string;
      job_description?: string;
    }>;
  };

  return (json.data ?? []).map((item) => {
    const title = item.job_title ?? 'Untitled role';
    const company = item.employer_name ?? 'Unknown company';
    const location = [item.job_city, item.job_state, item.job_country].filter(Boolean).join(', ');
    const jobUrl = item.job_apply_link || item.job_google_link || '';
    return {
      id: stableId(title, company, jobUrl),
      title,
      company,
      location: location || 'United States',
      url: jobUrl,
      source: 'JSearch',
      postedAt: item.job_posted_at_datetime_utc,
      snippet: item.job_description?.slice(0, 280),
    };
  });
}

async function searchUSAJobs(query: string, apiKey: string, userAgent: string): Promise<JobListing[]> {
  const url = new URL('https://data.usajobs.gov/api/search');
  url.searchParams.set('Keyword', query);
  url.searchParams.set('PositionOfferingTypeCode', 'IJ');
  url.searchParams.set('LocationName', 'United States');

  const res = await fetch(url, {
    headers: {
      'Authorization-Key': apiKey,
      'User-Agent': userAgent,
    },
  });

  if (!res.ok) return [];

  const json = (await res.json()) as {
    SearchResult?: {
      SearchResultItems?: Array<{
        MatchedObjectId?: string;
        MatchedObjectDescriptor?: {
          PositionTitle?: string;
          OrganizationName?: string;
          PositionLocationDisplay?: string;
          PositionURI?: string;
          PublicationStartDate?: string;
          QualificationSummary?: string;
        };
      }>;
    };
  };

  return (json.SearchResult?.SearchResultItems ?? []).map((item) => {
    const d = item.MatchedObjectDescriptor;
    const title = d?.PositionTitle ?? 'Untitled role';
    const company = d?.OrganizationName ?? 'US Federal';
    const jobUrl = d?.PositionURI ?? '';
    return {
      id: item.MatchedObjectId ?? stableId(title, company, jobUrl),
      title,
      company,
      location: d?.PositionLocationDisplay ?? 'United States',
      url: jobUrl,
      source: 'USAJobs',
      postedAt: d?.PublicationStartDate,
      snippet: d?.QualificationSummary?.slice(0, 280),
    };
  });
}

export async function findInternships(): Promise<{ jobs: JobListing[]; queries: string[] }> {
  const rapidKey = process.env.RAPIDAPI_KEY;
  const usaJobsKey = process.env.USAJOBS_API_KEY;
  const usaJobsAgent = process.env.USAJOBS_USER_AGENT ?? 'harsh.mehta@tamu.edu';

  const buckets = await Promise.all(
    SEARCH_QUERIES.flatMap((query) => {
      const tasks: Promise<JobListing[]>[] = [];
      if (rapidKey) tasks.push(searchJSearch(query, rapidKey));
      if (usaJobsKey) tasks.push(searchUSAJobs(query, usaJobsKey, usaJobsAgent));
      return tasks;
    }),
  );

  const merged = dedupeJobs(buckets.flat()).filter(isLegitInternship);
  return { jobs: merged, queries: SEARCH_QUERIES };
}
