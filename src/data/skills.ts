export type Skill = {
  name: string;
  description: string;
  /** Proficiency 1–100, used for bar chart visualization */
  level: number;
};

export type SkillCategory = {
  title: string;
  accent: string;
  icon: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Frameworks',
    accent: '#0071e3',
    icon: '\u{1F4BB}',
    skills: [
      { name: 'Python', level: 95, description: 'Primary language for quant tooling, ML pipelines, data engineering, and production automation.' },
      { name: 'C++', level: 82, description: 'Low-latency market data handlers, multithreaded systems, and performance-critical quant infrastructure.' },
      { name: 'Go', level: 70, description: 'Concurrent backend services and systems tooling with efficient parallelism and simple deployment.' },
      { name: 'TypeScript', level: 85, description: 'Type-safe frontends and full-stack apps with React and Node for reliable, maintainable code.' },
      { name: 'SQL', level: 88, description: 'Querying and modeling relational data for analytics, reporting, and production databases.' },
      { name: 'React', level: 85, description: 'Component-based UI library for interactive web apps, dashboards, and product surfaces.' },
      { name: 'React Native', level: 65, description: 'Cross-platform mobile apps using shared React patterns with near-native performance.' },
      { name: 'Flutter', level: 55, description: 'Cross-platform mobile UIs with a single Dart codebase and expressive widget system.' },
      { name: 'FastAPI', level: 90, description: 'High-performance Python APIs for ML inference, data services, and async backends.' },
      { name: 'Node.js', level: 78, description: 'JavaScript runtime for backend APIs, scripting, and real-time application tooling.' },
      { name: 'PyTorch', level: 75, description: 'Deep learning framework for model training, experimentation, and research-to-production workflows.' },
    ],
  },
  {
    title: 'AI / ML & Quant',
    accent: '#5856d6',
    icon: '\u{1F9E0}',
    skills: [
      { name: 'LLMs', level: 90, description: 'Large language models for reasoning, code generation, and agentic automation workflows.' },
      { name: 'RAG', level: 92, description: 'Retrieval-augmented generation that grounds LLM answers in private documents and live data.' },
      { name: 'Fine-tuning', level: 78, description: 'Adapting base models to domain-specific tasks with curated datasets and eval loops.' },
      { name: 'NLP', level: 85, description: 'Natural language processing for classification, entity extraction, and text understanding.' },
      { name: 'Prompt Engineering', level: 88, description: 'Designing reliable prompts, system instructions, and evaluation harnesses for LLM apps.' },
      { name: 'Model Quantization', level: 72, description: 'Compressing models (INT8/FP16) for faster, cheaper inference without major accuracy loss.' },
      { name: 'ONNX', level: 68, description: 'Portable model format for cross-runtime deployment, optimization, and hardware acceleration.' },
      { name: 'Statistical Modeling', level: 80, description: 'Hypothesis testing, regression, and probabilistic inference for data-driven decisions.' },
      { name: 'Time Series Analysis', level: 82, description: 'Forecasting and signal analysis on sequential market, sensor, or operational data.' },
      { name: 'Risk Modeling', level: 75, description: 'Measuring and simulating portfolio or operational risk under varied market scenarios.' },
      { name: 'LangChain', level: 88, description: 'Framework for chaining LLM calls, tools, memory, and retrieval into production pipelines.' },
      { name: 'HuggingFace', level: 80, description: 'Open model hub and transformers ecosystem for NLP experimentation and fine-tuning.' },
    ],
  },
  {
    title: 'AI Dev Tools \u00B7 2026',
    accent: '#af52de',
    icon: '\u{1F680}',
    skills: [
      { name: 'Cursor', level: 95, description: 'AI-native IDE for code generation, refactoring, and multi-file agentic development.' },
      { name: 'GitHub Copilot', level: 88, description: 'AI pair programmer for inline autocomplete, chat, and pull-request assistance.' },
      { name: 'MCP Servers', level: 82, description: 'Model Context Protocol servers that connect LLMs to external APIs, data, and tools.' },
      { name: 'Claude', level: 90, description: "Anthropic's LLM family for long-context reasoning, coding, and structured analysis." },
      { name: 'GPT-4o', level: 85, description: 'OpenAI multimodal model for fast, capable text, code, and vision workflows.' },
      { name: 'Gemini', level: 78, description: "Google's multimodal LLM for research, coding, and cloud-integrated AI tasks." },
      { name: 'Agent Skills', level: 80, description: 'Reusable instruction packs that guide AI agents on specialized, repeatable tasks.' },
      { name: 'Cursor Rules', level: 85, description: 'Project-level AI rules and conventions for consistent, on-brand code generation.' },
      { name: 'v0', level: 72, description: 'Vercel AI UI generator for rapid React and Tailwind component prototyping.' },
    ],
  },
  {
    title: 'Systems, Cloud & Data',
    accent: '#32ade6',
    icon: '\u{2601}\u{FE0F}',
    skills: [
      { name: 'Low-latency Systems', level: 85, description: 'Sub-millisecond pipelines for market data ingestion, normalization, and order routing.' },
      { name: 'Multithreading', level: 80, description: 'Parallel execution across CPU cores for throughput in I/O-bound and compute-heavy workloads.' },
      { name: 'Docker', level: 88, description: 'Containerized builds and deployments for reproducible dev, staging, and production environments.' },
      { name: 'Git', level: 92, description: 'Version control, branching workflows, and collaborative code review across teams.' },
      { name: 'AWS Lambda', level: 78, description: 'Serverless functions for event-driven, pay-per-use compute and API backends.' },
      { name: 'BigQuery', level: 82, description: 'Google Cloud warehouse for petabyte-scale SQL analytics and batch processing.' },
      { name: 'Firebase', level: 72, description: 'Realtime database, authentication, and hosting for mobile and web application backends.' },
      { name: 'Google Cloud', level: 85, description: 'Cloud platform for compute, ML services, and managed data infrastructure.' },
      { name: 'MongoDB', level: 80, description: 'Document database for flexible, schema-less application and analytics data.' },
      { name: 'MySQL', level: 78, description: 'Relational database for structured transactional and reporting workloads.' },
      { name: 'Tableau', level: 68, description: 'Interactive dashboards and visual analytics for exploring business and operational data.' },
      { name: 'REST APIs', level: 90, description: 'HTTP interfaces for integrating services, exposing data, and connecting distributed systems.' },
    ],
  },
];
