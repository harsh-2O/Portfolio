import apeLogo from '../assets/logos/ape-opt.jpg';
import carbonLogo from '../assets/logos/carbon-opt.jpg';
import sociobuzzLogo from '../assets/logos/sociobuzz-opt.jpg';
import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Production RAG Analytics Platform',
    subtitle: 'LLMs · FastAPI · BigQuery · Stock Data',
    year: '2024',
    description:
      'A production-grade Retrieval-Augmented Generation system built at SEARCE — enabling natural-language queries over large-scale stock market datasets with 30+ real-time backend APIs.',
    accent: '#0071e3',
    tags: ['Python', 'LangChain', 'FastAPI', 'BigQuery', 'RAG', 'LLMs', 'Docker'],
    highlights: [
      { label: 'APIs shipped', value: '30+' },
      { label: 'Build time', value: '22 days' },
      { label: 'Impact', value: 'Real-time analytics' },
    ],
    bullets: [
      'Architected cloud-agnostic, interface-driven deployment for AWS Lambda transformations.',
      'Exposed 30+ REST APIs enabling conversational analytics over stock market data.',
      'Integrated vector retrieval with LLM orchestration for accurate, context-aware responses.',
      'Partnered with cross-functional teams to deliver from prototype to production in 3 weeks.',
    ],
  },
  {
    id: 2,
    title: 'Sociabuzz',
    subtitle: 'Node.js · Express · MongoDB · React',
    year: '2023',
    description:
      'A full-stack social media REST API with React frontend — user accounts, posts, follows, likes, comments, and JWT authentication. Built with Node.js, Express, and MongoDB.',
    image: sociobuzzLogo,
    accent: '#ff6b35',
    repoUrl: 'https://github.com/harsh-2O/Sociabuzz',
    tags: ['Node.js', 'Express', 'MongoDB', 'React', 'REST API', 'Auth'],
    highlights: [
      { label: 'API surface', value: '4 resources' },
      { label: 'Stack', value: 'MERN' },
      { label: 'Features', value: 'Auth + social' },
    ],
    bullets: [
      'Built REST endpoints for users, posts, comments, likes, and authentication.',
      'Implemented user authentication and authorization with secure session handling.',
      'Designed MongoDB schemas for social graph interactions (follows, likes, comments).',
      'Shipped a React frontend UI with full CRUD flows for posts and user profiles.',
    ],
  },
  {
    id: 3,
    title: 'Carbon Footprint Analysis',
    subtitle: 'Data Science · EDA · Climate Data',
    year: '2023',
    description:
      'Industry-level carbon emissions analysis across global sectors — merging Climate TRACE, LSE product-level carbon intensities, and ResourceTradeEarth datasets to track and compare normalized carbon footprints.',
    image: carbonLogo,
    accent: '#34c759',
    repoUrl: 'https://github.com/harsh-2O/carbon-footprint-analysis',
    tags: ['Python', 'Pandas', 'NumPy', 'Jupyter', 'EDA', 'Climate Data'],
    highlights: [
      { label: 'Datasets', value: '3 merged' },
      { label: 'Scope', value: 'Global sectors' },
      { label: 'Output', value: 'Normalized CO₂' },
    ],
    bullets: [
      'Merged Climate TRACE, LSE product-level carbon intensities, and ResourceTradeEarth data.',
      'Grouped and structured emissions by industry sector with normalization for fair comparison.',
      'Built Jupyter analysis pipeline calculating carbon emissions in tons per sector.',
      'Planned ML integration and real-time carbon tracking web application as next phase.',
    ],
  },
  {
    id: 4,
    title: 'Summarize-IT',
    subtitle: 'NLP · Web Scraping · Extractive Summarization',
    year: '2023',
    description:
      'An extractive summarizer that scrapes web pages and condenses content using NLP — reducing reading time by 30–40% with graph-based sentence ranking (NetworkX) and Trafilatura extraction.',
    accent: '#5856d6',
    repoUrl: 'https://github.com/harsh-2O/Summeriz-IT',
    tags: ['Python', 'NLTK', 'NetworkX', 'BeautifulSoup', 'Trafilatura', 'NLP'],
    highlights: [
      { label: 'Time saved', value: '30–40%' },
      { label: 'Method', value: 'Extractive NLP' },
      { label: 'Input', value: 'Any URL' },
    ],
    bullets: [
      'Implemented extractive summarization pipeline with NLTK and NetworkX graph ranking.',
      'Integrated Trafilatura and BeautifulSoup for robust web content extraction.',
      'Designed CLI workflow: paste a URL, receive a concise summary in seconds.',
      'Reduced document reading time by 30–40% on long-form web articles.',
    ],
  },
  {
    id: 5,
    title: 'Audio Personality Emulator (APE)',
    subtitle: 'ML · Audio Processing · Voice Synthesis',
    year: '2023',
    description:
      'A machine learning system that learns user-specific voice characteristics from audio samples and reproduces personalized speech patterns — bridging signal processing and generative AI.',
    image: apeLogo,
    accent: '#af52de',
    tags: ['Python', 'Librosa', 'Scikit-learn', 'MFCC', 'Regression', 'GAN (planned)'],
    highlights: [
      { label: 'Pipeline', value: 'End-to-end ML' },
      { label: 'Features', value: 'MFCC extraction' },
      { label: 'Goal', value: 'Voice profiles' },
    ],
    bullets: [
      'Built MFCC feature extraction and preprocessing pipelines for audio sequence modeling.',
      'Trained regression models to predict and reproduce user-specific voice characteristics.',
      'Designed architecture for future GAN integration to achieve realistic voice synthesis.',
      'Explored personalized voice profiles for consumer AI assistants (Alexa, Siri).',
    ],
  },
];
