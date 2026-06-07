import apeLogo from '../assets/logos/ape-opt.jpg';
import carbonLogo from '../assets/logos/carbon-opt.jpg';
import sociobuzzLogo from '../assets/logos/sociobuzz-opt.jpg';
import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Audio Personality Emulator (APE)',
    subtitle: 'ML · Audio Processing · Voice Synthesis',
    year: '2023',
    description:
      'A machine learning system that learns user-specific voice characteristics from audio samples and reproduces personalized speech patterns — bridging signal processing and generative AI.',
    image: apeLogo,
    accent: '#5856d6',
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
    id: 2,
    title: 'Production RAG Analytics Platform',
    subtitle: 'LLMs · FastAPI · BigQuery · Stock Data',
    year: '2024',
    description:
      'A production-grade Retrieval-Augmented Generation system built at SEARCE — enabling natural-language queries over large-scale stock market datasets with 30+ real-time backend APIs.',
    image: sociobuzzLogo,
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
    id: 3,
    title: 'Carbon Footprint Analysis',
    subtitle: 'Data Science · EDA · Visualization',
    year: '2023',
    description:
      'A data analysis project processing 100,000+ data points across 3 datasets to calculate and compare carbon intensities across 15 industries — turning raw emissions data into actionable insights.',
    image: carbonLogo,
    accent: '#34c759',
    tags: ['Python', 'Pandas', 'Matplotlib', 'EDA', 'Normalization', 'Jupyter'],
    highlights: [
      { label: 'Data points', value: '100K+' },
      { label: 'Industries', value: '15' },
      { label: 'Datasets', value: '3 merged' },
    ],
    bullets: [
      'Processed and merged 3 heterogeneous datasets with 100,000+ emission records.',
      'Calculated carbon intensities across 15 industries with normalization for fair comparison.',
      'Built interactive visualizations to surface trends and support data-driven decisions.',
      'Planned ML integration and real-time carbon tracking web application as next phase.',
    ],
  },
];
