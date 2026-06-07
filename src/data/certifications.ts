export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

/**
 * Curated credentials — GCP, LinkedIn Learning (Anthropic), Coursera data & ML coursework.
 * Sourced from LinkedIn: https://www.linkedin.com/in/harsh2o/
 */
export const certifications: Certification[] = [
  {
    id: 'gcp-associate',
    name: 'Associate Cloud Engineer',
    issuer: 'Google Cloud',
    date: '2024',
    credentialUrl: 'https://cloud.google.com/learn/certification/cloud-engineer',
  },
  {
    id: 'gcp-digital-leader',
    name: 'Cloud Digital Leader',
    issuer: 'Google Cloud',
    date: '2024',
    credentialUrl: 'https://cloud.google.com/learn/certification/cloud-digital-leader',
  },
  {
    id: 'linkedin-mcp-anthropic',
    name: 'Model Context Protocol (MCP): Hands-On with Agentic AI',
    issuer: 'LinkedIn Learning · Anthropic Claude',
    date: 'Mar 2025',
    credentialUrl: 'https://www.linkedin.com/learning/model-context-protocol-mcp-hands-on-with-agentic-ai',
  },
  {
    id: 'linkedin-claude-35',
    name: "Next-Level AI Capabilities in Anthropic's Claude 3.5",
    issuer: 'LinkedIn Learning · Anthropic',
    date: 'Jul 2024',
    credentialUrl: 'https://www.linkedin.com/learning/next-level-ai-capabilities-in-anthropic-s-claude-3-5',
  },
  {
    id: 'coursera-data-analytics',
    name: 'Digital Marketing Analytics in Theory (with Honors)',
    issuer: 'University of Illinois · Coursera',
    date: 'Jul 2021',
    credentialUrl: 'https://coursera.org/account/accomplishments/certificate/KGN3UBDHQFVU',
  },
  {
    id: 'coursera-cpp',
    name: 'C++ Object Basics: Functions, Recursion, and Objects',
    issuer: 'Codio · Coursera',
    date: 'Dec 2021',
    credentialUrl: 'https://coursera.org/account/accomplishments/certificate/PQZGRHM33R55',
  },
];
