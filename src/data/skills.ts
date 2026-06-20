export type SkillMeta = { key: string; value: string };

export type Skill = {
  name: string;
  description: string;
  /** Proficiency 1–100 */
  level: number;
  /** Industry demand/relevance 1–100 (2026 benchmark) */
  demand: number;
  /** Extended detail shown on expand (optional) */
  detail?: string;
  /** Structured key-value pairs for terminal readout (optional) */
  meta?: SkillMeta[];
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
      { name: 'Python', level: 95, demand: 96, description: 'Primary language for quant tooling, ML pipelines, data engineering, and production automation.' },
      { name: 'C++', level: 82, demand: 78, description: 'Low-latency market data handlers, multithreaded systems, and performance-critical quant infrastructure.' },
      { name: 'Go', level: 70, demand: 82, description: 'Concurrent backend services and systems tooling with efficient parallelism and simple deployment.' },
      { name: 'TypeScript', level: 85, demand: 94, description: 'Type-safe frontends and full-stack apps with React and Node for reliable, maintainable code.' },
      { name: 'SQL', level: 88, demand: 90, description: 'Querying and modeling relational data for analytics, reporting, and production databases.' },
      { name: 'React', level: 85, demand: 92, description: 'Component-based UI library for interactive web apps, dashboards, and product surfaces.' },
      { name: 'React Native', level: 65, demand: 68, description: 'Cross-platform mobile apps using shared React patterns with near-native performance.' },
      { name: 'Flutter', level: 55, demand: 58, description: 'Cross-platform mobile UIs with a single Dart codebase and expressive widget system.' },
      { name: 'FastAPI', level: 90, demand: 88, description: 'High-performance Python APIs for ML inference, data services, and async backends.' },
      { name: 'Node.js', level: 78, demand: 85, description: 'JavaScript runtime for backend APIs, scripting, and real-time application tooling.' },
      { name: 'PyTorch', level: 75, demand: 90, description: 'Deep learning framework for model training, experimentation, and research-to-production workflows.' },
    ],
  },
  {
    title: 'AI / ML & Quant',
    accent: '#5856d6',
    icon: '\u{1F9E0}',
    skills: [
      { name: 'LLMs', level: 90, demand: 98, description: 'Large language models for reasoning, code generation, and agentic automation workflows.' },
      { name: 'RAG', level: 92, demand: 95, description: 'Retrieval-augmented generation that grounds LLM answers in private documents and live data.' },
      { name: 'Fine-tuning', level: 78, demand: 88, description: 'Adapting base models to domain-specific tasks with curated datasets and eval loops.' },
      { name: 'NLP', level: 85, demand: 82, description: 'Natural language processing for classification, entity extraction, and text understanding.' },
      { name: 'Prompt Engineering', level: 88, demand: 94, description: 'Designing reliable prompts, system instructions, and evaluation harnesses for LLM apps.' },
      { name: 'Model Quantization', level: 72, demand: 80, description: 'Compressing models (INT8/FP16) for faster, cheaper inference without major accuracy loss.' },
      { name: 'ONNX', level: 68, demand: 65, description: 'Portable model format for cross-runtime deployment, optimization, and hardware acceleration.' },
      { name: 'Statistical Modeling', level: 80, demand: 75, description: 'Hypothesis testing, regression, and probabilistic inference for data-driven decisions.' },
      { name: 'Time Series Analysis', level: 82, demand: 78, description: 'Forecasting and signal analysis on sequential market, sensor, or operational data.' },
      { name: 'Risk Modeling', level: 75, demand: 72, description: 'Measuring and simulating portfolio or operational risk under varied market scenarios.' },
      { name: 'LangChain', level: 88, demand: 90, description: 'Framework for chaining LLM calls, tools, memory, and retrieval into production pipelines.' },
      { name: 'HuggingFace', level: 80, demand: 88, description: 'Open model hub and transformers ecosystem for NLP experimentation and fine-tuning.' },
    ],
  },
  {
    title: 'AI Dev Tools \u00B7 2026',
    accent: '#af52de',
    icon: '\u{1F680}',
    skills: [
      {
        name: 'Cursor',
        level: 95,
        demand: 92,
        description: 'AI-native IDE with agentic multi-file editing, background agents, and deep codebase awareness.',
        detail: 'Daily driver for all dev work. Custom .cursor/rules/ per project enforce commit style, efficiency patterns, and code quality. Agent Skills (SKILL.md) automate repeatable workflows like PR splitting, Slack digests, and superdev team simulation \u2014 saving 40\u201360% on token spend vs unguided prompting.',
        meta: [
          { key: 'USE_CASE', value: 'Daily driver \u2014 all dev work' },
          { key: 'TOKEN_SAVE', value: '40\u201360% vs unguided prompting' },
          { key: 'KEY_CONFIG', value: '.cursor/rules/ + SKILL.md' },
          { key: 'SKILLS_AUTHORED', value: '10+ (superdev, digest, loop)' },
        ],
      },
      {
        name: 'GitHub Copilot',
        level: 88,
        demand: 90,
        description: 'AI pair programmer for inline autocomplete, chat, and pull-request assistance.',
        detail: 'Used alongside Cursor for quick inline completions. Copilot chat handles one-off questions; Cursor agents handle multi-step work. The combo covers both fast-twitch and strategic AI-assisted coding.',
        meta: [
          { key: 'MODE', value: 'Inline completions + chat' },
          { key: 'PAIRS_WITH', value: 'Cursor agents for multi-step' },
        ],
      },
      {
        name: 'MCP Servers',
        level: 82,
        demand: 85,
        description: 'Model Context Protocol servers that connect LLMs to external APIs, data, and tools.',
        detail: 'Running Atlassian MCP (Jira + Confluence read/write), Slack MCP for digest skills, and GitHub MCP for PR workflows. Each server gives agents real context instead of hallucinated guesses \u2014 the single biggest token-saver in agentic setups.',
        meta: [
          { key: 'ACTIVE', value: 'Atlassian, Slack, GitHub' },
          { key: 'IMPACT', value: 'Real context > hallucination' },
          { key: 'TOKEN_SAVE', value: 'Biggest single saver in agentic flows' },
        ],
      },
      {
        name: 'Claude',
        level: 90,
        demand: 95,
        description: "Anthropic\u2019s LLM family for long-context reasoning, coding, and structured analysis.",
        detail: 'Primary model for complex multi-file refactors and architectural decisions (Opus/Sonnet). Extended thinking mode for debugging. 200K context window means full codebase awareness without chunking \u2014 critical for large PRs.',
        meta: [
          { key: 'MODELS', value: 'Opus 4, Sonnet 4 (daily)' },
          { key: 'USE_CASE', value: 'Multi-file refactors, architecture' },
          { key: 'CONTEXT', value: '200K tokens \u2014 full codebase' },
        ],
      },
      {
        name: 'GPT-4o',
        level: 85,
        demand: 88,
        description: 'OpenAI multimodal model for fast, capable text, code, and vision workflows.',
        detail: 'Used for quick iterations where speed matters more than depth. Vision mode for reviewing UI screenshots and design diffs. Lower cost-per-token makes it the default for high-volume tasks like batch renaming or doc generation.',
        meta: [
          { key: 'USE_CASE', value: 'Fast iterations, batch tasks' },
          { key: 'STRENGTH', value: 'Vision mode for UI review' },
          { key: 'COST', value: 'Lower \u2014 default for high-volume' },
        ],
      },
      {
        name: 'Gemini',
        level: 78,
        demand: 80,
        description: "Google\u2019s multimodal LLM for research, coding, and cloud-integrated AI tasks.",
        detail: 'Primary use: research and comparison against Claude/GPT outputs. 1M+ context window useful for ingesting entire repos or long documents in a single pass.',
        meta: [
          { key: 'USE_CASE', value: 'Research, cross-model comparison' },
          { key: 'CONTEXT', value: '1M+ tokens \u2014 full repo ingestion' },
        ],
      },
      {
        name: 'Agent Skills',
        level: 80,
        demand: 78,
        description: 'Reusable SKILL.md instruction packs that guide AI agents on specialized, repeatable tasks.',
        detail: 'Authored 10+ skills: superdev (team simulation), slack-daily-digest, split-to-prs, create-rule, loop (interval execution). Each skill has a SKILL.md with structured instructions \u2014 agents follow them instead of improvising, cutting token waste by 30\u201350%.',
        meta: [
          { key: 'AUTHORED', value: '10+ production skills' },
          { key: 'TOP_SKILLS', value: 'superdev, digest, split-to-prs' },
          { key: 'TOKEN_SAVE', value: '30\u201350% vs unguided agents' },
        ],
      },
      {
        name: 'Cursor Rules',
        level: 85,
        demand: 82,
        description: 'Project-level AI rules and conventions for consistent, on-brand code generation.',
        detail: 'Every project gets .cursor/rules/ with: efficiency rules (batch tool calls, no re-reads), commit protocols (HEREDOC messages, no --amend unless safe), post-task AskQuestion loops, and complexity headers. Rules persist across sessions \u2014 no re-explaining conventions.',
        meta: [
          { key: 'COVERS', value: 'Efficiency, commits, post-task loops' },
          { key: 'PATTERN', value: 'Persist across sessions' },
          { key: 'PATH', value: '.cursor/rules/*.mdc' },
        ],
      },
      {
        name: 'v0',
        level: 72,
        demand: 75,
        description: 'Vercel AI UI generator for rapid React and Tailwind component prototyping.',
        detail: 'Used for initial component scaffolding before refining in Cursor. Generates Tailwind + shadcn/ui layouts that get ported to Emotion styled-components in this portfolio\u2019s stack.',
        meta: [
          { key: 'USE_CASE', value: 'Scaffolding \u2192 Cursor refinement' },
          { key: 'OUTPUT', value: 'Tailwind + shadcn/ui \u2192 Emotion' },
        ],
      },
    ],
  },
  {
    title: 'Systems, Cloud & Data',
    accent: '#32ade6',
    icon: '\u{2601}\u{FE0F}',
    skills: [
      { name: 'Low-latency Systems', level: 85, demand: 80, description: 'Sub-millisecond pipelines for market data ingestion, normalization, and order routing.' },
      { name: 'Multithreading', level: 80, demand: 78, description: 'Parallel execution across CPU cores for throughput in I/O-bound and compute-heavy workloads.' },
      { name: 'Docker', level: 88, demand: 92, description: 'Containerized builds and deployments for reproducible dev, staging, and production environments.' },
      { name: 'Git', level: 92, demand: 95, description: 'Version control, branching workflows, and collaborative code review across teams.' },
      { name: 'AWS Lambda', level: 78, demand: 85, description: 'Serverless functions for event-driven, pay-per-use compute and API backends.' },
      { name: 'BigQuery', level: 82, demand: 80, description: 'Google Cloud warehouse for petabyte-scale SQL analytics and batch processing.' },
      { name: 'Firebase', level: 72, demand: 70, description: 'Realtime database, authentication, and hosting for mobile and web application backends.' },
      { name: 'Google Cloud', level: 85, demand: 88, description: 'Cloud platform for compute, ML services, and managed data infrastructure.' },
      { name: 'MongoDB', level: 80, demand: 78, description: 'Document database for flexible, schema-less application and analytics data.' },
      { name: 'MySQL', level: 78, demand: 75, description: 'Relational database for structured transactional and reporting workloads.' },
      { name: 'Tableau', level: 68, demand: 65, description: 'Interactive dashboards and visual analytics for exploring business and operational data.' },
      { name: 'REST APIs', level: 90, demand: 88, description: 'HTTP interfaces for integrating services, exposing data, and connecting distributed systems.' },
    ],
  },
];
