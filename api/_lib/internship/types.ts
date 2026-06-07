export type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  source: string;
  postedAt?: string;
  snippet?: string;
};

export type ScanResult = {
  scannedAt: string;
  totalFound: number;
  newCount: number;
  emailSent: boolean;
  queries: string[];
};
