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
      'A production-grade Retrieval-Augmented Generation system built at SEARCE — enabling natural-language queries over large-scale stock market datasets. Architected hybrid retrieval (dense vectors + BM25 + SQL routing), event-aware chunking with financial metadata, and cross-encoder reranking across 30+ real-time backend APIs. Shipped from prototype to production in 22 days.',
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
      'Implemented hybrid retrieval with query classification — routing numeric lookups to SQL/BigQuery directly.',
      'Built a cross-encoder reranker stage that cut hallucination rates more than upgrading the embedding model.',
      'Partnered with cross-functional teams to deliver from prototype to production in 3 weeks.',
    ],
  },
  {
    id: 2,
    title: 'Sociabuzz',
    subtitle: 'Node.js · Express · MongoDB · React',
    year: '2023',
    description:
      'A full-stack social media platform with React frontend and Node.js/Express backend — featuring user accounts, posts, follows, likes, comments, and JWT authentication. Built with MongoDB for social graph persistence and designed with RESTful architecture supporting full CRUD operations across 4 resource types.',
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
      'An extractive summarization pipeline that scrapes web pages and condenses long-form content using NLP — reducing reading time by 30–40%. Uses graph-based sentence ranking (NetworkX TextRank) with Trafilatura for robust content extraction from any URL, producing concise summaries in seconds.',
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
      'A machine learning system that learns user-specific voice characteristics from audio samples and reproduces personalized speech patterns. Bridges digital signal processing and generative AI — extracting MFCC features from audio, training regression models for voice characteristic prediction, with architecture designed for GAN-based voice synthesis.',
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
  {
    id: 6,
    title: 'TaskNinja VS Todo',
    subtitle: 'VS Code Extension · TypeScript · Svelte · MySQL',
    year: '2023',
    description:
      'A VS Code productivity extension for creating, managing, and tracking daily tasks — with MySQL-backed persistence and GitHub OAuth so tasks sync across machines.',
    accent: '#32ade6',
    repoUrl: 'https://github.com/harsh-2O/TaskNinja_VsTodo',
    tags: ['TypeScript', 'Svelte', 'VS Code API', 'MySQL', 'GitHub OAuth'],
    highlights: [
      { label: 'Platform', value: 'VS Code' },
      { label: 'Storage', value: 'MySQL' },
      { label: 'Auth', value: 'GitHub OAuth' },
    ],
    bullets: [
      'Built a VS Code sidebar extension with Svelte webviews for task CRUD and completion tracking.',
      'Integrated MySQL for per-user remote task storage accessible from any device.',
      'Added GitHub authentication for secure account management and data isolation.',
      'Supported sorting by due date, priority, and name with copy-to-task quick capture.',
    ],
  },
  {
    id: 7,
    title: 'YouTube Data API Analysis',
    subtitle: 'Data Viz · Sentiment · Channel Analytics',
    year: '2023',
    description:
      'A Jupyter-based analytics suite over the YouTube Data API — exploring comment sentiment, like patterns, upload cadence, and channel behavior with line charts, bar charts, and scatter plots.',
    accent: '#ff3b30',
    repoUrl: 'https://github.com/harsh-2O/YouTube_DataAPI_Analysis',
    tags: ['Python', 'Jupyter', 'YouTube API', 'Pandas', 'Visualization', 'NLP'],
    highlights: [
      { label: 'Data source', value: 'YouTube API' },
      { label: 'Analysis', value: 'Sentiment + trends' },
      { label: 'Format', value: 'Notebooks' },
    ],
    bullets: [
      'Pulled video metadata, comments, and engagement metrics via the YouTube Data API v3.',
      'Analyzed comment sentiment, like distributions, and upload patterns across channels.',
      'Organized pipeline into `data/` and `notebooks/` directories for reproducible analysis.',
      'Built visualizations (line, bar, scatter) to surface trends in the YouTube ecosystem.',
    ],
  },
  {
    id: 8,
    title: 'Image Quilting',
    subtitle: 'Computer Vision · Texture Synthesis · Jupyter',
    year: '2023',
    description:
      'Implementation of the Image Quilting algorithm for texture synthesis and transfer — stitching patches from a sample texture with minimum-error boundary cuts for seamless, visually coherent output.',
    accent: '#ff9500',
    repoUrl: 'https://github.com/harsh-2O/Image-Quilting-for-Texture-Synthesis-and-Transfer',
    tags: ['Python', 'Jupyter', 'Computer Vision', 'Image Processing', 'NumPy'],
    highlights: [
      { label: 'Technique', value: 'Patch quilting' },
      { label: 'Key step', value: 'Min-error cut' },
      { label: 'Output', value: 'Seamless textures' },
    ],
    bullets: [
      'Implemented patch selection from a sample texture for large synthesized images.',
      'Applied minimum boundary cut to eliminate visible seams between adjacent patches.',
      'Explored texture transfer by adapting quilting to target image structure.',
      'Documented the full pipeline: sample → patch → overlap → cut → stitch.',
    ],
  },
  {
    id: 9,
    title: 'PyMLAlgos',
    subtitle: 'Machine Learning · From-Scratch Implementations',
    year: '2023',
    description:
      'A Python library of machine learning algorithms implemented from scratch — covering core supervised and unsupervised methods for data science and ML coursework at IIIT Vadodara.',
    accent: '#30b0c7',
    repoUrl: 'https://github.com/harsh-2O/PyMLAlgos',
    tags: ['Python', 'Scikit-learn', 'NumPy', 'ML Algorithms', 'Education'],
    highlights: [
      { label: 'Focus', value: 'From scratch' },
      { label: 'Domain', value: 'ML / DS' },
      { label: 'License', value: 'MIT' },
    ],
    bullets: [
      'Implemented foundational ML algorithms for regression, classification, and clustering.',
      'Structured code for learning and experimentation alongside scikit-learn comparisons.',
      'Covered preprocessing, training loops, and evaluation metrics in pure Python.',
      'Used as a reference codebase for data science and machine learning coursework.',
    ],
  },
  {
    id: 10,
    title: 'Krypt',
    subtitle: 'React · Ethereum · MetaMask · Hardhat',
    year: '2023',
    description:
      'A blockchain web app for secure Ether transfers — React + Tailwind UI with MetaMask wallet integration and Hardhat smart contract validation on the Ethereum testnet.',
    accent: '#627eea',
    repoUrl: 'https://github.com/harsh-2O/Krypt',
    tags: ['React', 'Tailwind', 'Ethereum', 'MetaMask', 'Hardhat', 'Solidity'],
    highlights: [
      { label: 'Wallet', value: 'MetaMask' },
      { label: 'Network', value: 'ETH testnet' },
      { label: 'Contracts', value: 'Hardhat' },
    ],
    bullets: [
      'Built React frontend with Tailwind CSS for crypto transfer workflows.',
      'Integrated MetaMask for secure wallet connection and Ether transactions.',
      'Validated smart contracts on Ethereum testnet using Hardhat toolchain.',
      'Designed UX for transparent on-chain transfer confirmation and error handling.',
    ],
  },
  {
    id: 11,
    title: 'DeadChat — Real-Time Chat',
    subtitle: 'Socket.io · JavaScript · Live Messaging',
    year: '2022',
    description:
      'DeadChat is a real-time online chat web application built for Dead Society — live messaging with Socket.io, HTML/CSS/JS frontend, and persistent room-based conversations.',
    accent: '#00c7be',
    repoUrl: 'https://github.com/harsh-2O/RealTime_Chat_Application',
    tags: ['JavaScript', 'Socket.io', 'HTML/CSS', 'WebSockets', 'Real-time'],
    highlights: [
      { label: 'Transport', value: 'Socket.io' },
      { label: 'Mode', value: 'Real-time' },
      { label: 'Use case', value: 'Live chat' },
    ],
    bullets: [
      'Implemented bidirectional real-time messaging with Socket.io event channels.',
      'Built responsive chat UI with room-based message threading.',
      'Handled connection lifecycle, reconnection, and live message broadcast.',
      'Deployed as a web-first chat experience for community group conversations.',
    ],
  },
  {
    id: 12,
    title: 'Code Combat Plagiarism Checker',
    subtitle: 'JavaScript · Contest Integrity · IIIT Horizon',
    year: '2023',
    description:
      'A plagiarism detection tool built for Code Combat — the annual coding contest at Horizon, IIIT Vadodara ICD — to flag similar submissions and uphold contest integrity.',
    accent: '#bf5af2',
    repoUrl: 'https://github.com/harsh-2O/Code-Combat-2023',
    tags: ['JavaScript', 'Plagiarism Detection', 'Contest', 'IIIT Vadodara'],
    highlights: [
      { label: 'Event', value: 'Horizon fest' },
      { label: 'Purpose', value: 'Code integrity' },
      { label: 'Stars', value: '3' },
    ],
    bullets: [
      'Built submission similarity checker for Code Combat contest at IIIT Vadodara ICD.',
      'Compared student code submissions to detect potential plagiarism patterns.',
      'Used by Horizon tech-fest organizers to maintain fair competition standards.',
      'Open-sourced tooling for reuse in future coding contest editions.',
    ],
  },
  {
    id: 13,
    title: 'Reactodo',
    subtitle: 'React · Todo App · Session UI',
    year: '2023',
    description:
      'A lightweight React todo list app for creating, updating, and deleting tasks within an active browser session — clean component architecture with local state management.',
    accent: '#64d2ff',
    repoUrl: 'https://github.com/harsh-2O/Reactodo',
    tags: ['React', 'JavaScript', 'Frontend', 'SPA'],
    highlights: [
      { label: 'Framework', value: 'React' },
      { label: 'Scope', value: 'Session UI' },
      { label: 'Ops', value: 'CRUD tasks' },
    ],
    bullets: [
      'Implemented add, edit, and delete task flows with React component state.',
      'Designed minimal UI for fast task capture during active sessions.',
      'Structured project for easy local development with npm start workflow.',
      'Served as an early React learning project before full-stack MERN work.',
    ],
  },
];
