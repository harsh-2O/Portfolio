export type Skill = {
  name: string;
  description: string;
};

export type SkillCategory = {
  title: string;
  accent: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Frameworks',
    accent: '#0071e3',
    skills: [
      {
        name: 'Python',
        description: 'Primary language for quant tooling, ML pipelines, data engineering, and production automation.',
      },
      {
        name: 'C++',
        description: 'Low-latency market data handlers, multithreaded systems, and performance-critical quant infrastructure.',
      },
      {
        name: 'Go',
        description: 'Concurrent backend services and systems tooling with efficient parallelism and simple deployment.',
      },
      {
        name: 'TypeScript',
        description: 'Type-safe frontends and full-stack apps with React and Node for reliable, maintainable code.',
      },
      {
        name: 'SQL',
        description: 'Querying and modeling relational data for analytics, reporting, and production databases.',
      },
      {
        name: 'React',
        description: 'Component-based UI library for interactive web apps, dashboards, and product surfaces.',
      },
      {
        name: 'React Native',
        description: 'Cross-platform mobile apps using shared React patterns with near-native performance.',
      },
      {
        name: 'Flutter',
        description: 'Cross-platform mobile UIs with a single Dart codebase and expressive widget system.',
      },
      {
        name: 'FastAPI',
        description: 'High-performance Python APIs for ML inference, data services, and async backends.',
      },
      {
        name: 'Node.js',
        description: 'JavaScript runtime for backend APIs, scripting, and real-time application tooling.',
      },
      {
        name: 'PyTorch',
        description: 'Deep learning framework for model training, experimentation, and research-to-production workflows.',
      },
    ],
  },
  {
    title: 'AI / ML & Quant',
    accent: '#5856d6',
    skills: [
      {
        name: 'LLMs',
        description: 'Large language models for reasoning, code generation, and agentic automation workflows.',
      },
      {
        name: 'RAG',
        description: 'Retrieval-augmented generation that grounds LLM answers in private documents and live data.',
      },
      {
        name: 'Fine-tuning',
        description: 'Adapting base models to domain-specific tasks with curated datasets and eval loops.',
      },
      {
        name: 'NLP',
        description: 'Natural language processing for classification, entity extraction, and text understanding.',
      },
      {
        name: 'Prompt Engineering',
        description: 'Designing reliable prompts, system instructions, and evaluation harnesses for LLM apps.',
      },
      {
        name: 'Model Quantization',
        description: 'Compressing models (INT8/FP16) for faster, cheaper inference without major accuracy loss.',
      },
      {
        name: 'ONNX',
        description: 'Portable model format for cross-runtime deployment, optimization, and hardware acceleration.',
      },
      {
        name: 'Statistical Modeling',
        description: 'Hypothesis testing, regression, and probabilistic inference for data-driven decisions.',
      },
      {
        name: 'Time Series Analysis',
        description: 'Forecasting and signal analysis on sequential market, sensor, or operational data.',
      },
      {
        name: 'Risk Modeling',
        description: 'Measuring and simulating portfolio or operational risk under varied market scenarios.',
      },
      {
        name: 'LangChain',
        description: 'Framework for chaining LLM calls, tools, memory, and retrieval into production pipelines.',
      },
      {
        name: 'HuggingFace',
        description: 'Open model hub and transformers ecosystem for NLP experimentation and fine-tuning.',
      },
    ],
  },
  {
    title: 'AI Dev Tools · 2026',
    accent: '#af52de',
    skills: [
      {
        name: 'Cursor',
        description: 'AI-native IDE for code generation, refactoring, and multi-file agentic development.',
      },
      {
        name: 'Cursor AI',
        description: 'In-editor AI assistant for context-aware coding, debugging, and codebase navigation.',
      },
      {
        name: 'GitHub Copilot',
        description: 'AI pair programmer for inline autocomplete, chat, and pull-request assistance.',
      },
      {
        name: 'MCP Servers',
        description: 'Model Context Protocol servers that connect LLMs to external APIs, data, and tools.',
      },
      {
        name: 'Claude',
        description: "Anthropic's LLM family for long-context reasoning, coding, and structured analysis.",
      },
      {
        name: 'GPT-4o',
        description: 'OpenAI multimodal model for fast, capable text, code, and vision workflows.',
      },
      {
        name: 'Gemini',
        description: "Google's multimodal LLM for research, coding, and cloud-integrated AI tasks.",
      },
      {
        name: 'Agent Skills',
        description: 'Reusable instruction packs that guide AI agents on specialized, repeatable tasks.',
      },
      {
        name: 'Cursor Rules',
        description: 'Project-level AI rules and conventions for consistent, on-brand code generation.',
      },
      {
        name: 'v0',
        description: 'Vercel AI UI generator for rapid React and Tailwind component prototyping.',
      },
    ],
  },
  {
    title: 'Systems, Cloud & Data',
    accent: '#32ade6',
    skills: [
      {
        name: 'Low-latency Systems',
        description: 'Sub-millisecond pipelines for market data ingestion, normalization, and order routing.',
      },
      {
        name: 'Multithreading',
        description: 'Parallel execution across CPU cores for throughput in I/O-bound and compute-heavy workloads.',
      },
      {
        name: 'Docker',
        description: 'Containerized builds and deployments for reproducible dev, staging, and production environments.',
      },
      {
        name: 'Git',
        description: 'Version control, branching workflows, and collaborative code review across teams.',
      },
      {
        name: 'AWS Lambda',
        description: 'Serverless functions for event-driven, pay-per-use compute and API backends.',
      },
      {
        name: 'BigQuery',
        description: 'Google Cloud warehouse for petabyte-scale SQL analytics and batch processing.',
      },
      {
        name: 'Firebase',
        description: 'Realtime database, authentication, and hosting for mobile and web application backends.',
      },
      {
        name: 'Google Cloud',
        description: 'Cloud platform for compute, ML services, and managed data infrastructure.',
      },
      {
        name: 'MongoDB',
        description: 'Document database for flexible, schema-less application and analytics data.',
      },
      {
        name: 'MySQL',
        description: 'Relational database for structured transactional and reporting workloads.',
      },
      {
        name: 'Tableau',
        description: 'Interactive dashboards and visual analytics for exploring business and operational data.',
      },
      {
        name: 'Google Apps Script',
        description: 'Automating Google Workspace workflows — Sheets, Docs, and Gmail — with JavaScript.',
      },
      {
        name: 'REST APIs',
        description: 'HTTP interfaces for integrating services, exposing data, and connecting distributed systems.',
      },
    ],
  },
];
