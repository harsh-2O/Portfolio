export type WorkflowGroup = 'Cursor' | 'MCP' | 'Skills' | 'Patterns';

export interface WorkflowItem {
  label: string;
  value: string;
}

export interface WorkflowSnippet {
  /** Shown as the language tag, e.g. "json", "md", "bash". */
  language: string;
  /** File name or path shown in the code block header. */
  fileName: string;
  code: string;
}

export interface WorkflowCard {
  id: string;
  title: string;
  subtitle: string;
  group: WorkflowGroup;
  description: string;
  items: WorkflowItem[];
  snippet: WorkflowSnippet;
}

export const WORKFLOW_GROUPS: WorkflowGroup[] = ['Cursor', 'MCP', 'Skills', 'Patterns'];

export const workflowCards: WorkflowCard[] = [
  {
    id: 'cursor-rules',
    title: 'Cursor Rules',
    subtitle: '.cursor/rules/',
    group: 'Cursor',
    description:
      'Project-level AI rules that persist across sessions. Every repo gets efficiency, commit, and code quality rules so agents never need re-explaining.',
    items: [
      { label: 'Efficiency', value: 'Batch tool calls, no re-reads, complexity headers' },
      { label: 'Commits', value: 'HEREDOC messages, no --amend unless safe, verify HEAD' },
      { label: 'Post-task', value: 'AskQuestion loop with 2–4 next steps' },
      { label: 'Path', value: '.cursor/rules/*.mdc' },
    ],
    snippet: {
      language: 'mdc',
      fileName: '.cursor/rules/efficiency.mdc',
      code: `---
description: Request cost efficiency
alwaysApply: true
---

1. Plan the FULL set of changes across all files before editing.
2. Don't re-read, re-search, or re-list files already in context.
3. Show diffs, not full file contents, unless asked.
4. Batch clarifying questions at the start, not one at a time.
5. First response to a new task: "Complexity: Low / Medium / High".
6. Batch independent tool calls into a single message.`,
    },
  },
  {
    id: 'mcp-servers',
    title: 'MCP Servers',
    subtitle: 'Model Context Protocol',
    group: 'MCP',
    description:
      'Connect LLMs to real data instead of hallucinating. Each server gives agents read/write access to external systems.',
    items: [
      { label: 'Atlassian', value: 'Jira issues + Confluence pages (read/write)' },
      { label: 'Slack', value: 'Daily digests, unresolved threads, meeting prep' },
      { label: 'GitHub', value: 'PR creation, code review, branch management' },
      { label: 'Impact', value: 'Biggest single token-saver in agentic flows' },
    ],
    snippet: {
      language: 'json',
      fileName: '~/.cursor/mcp.json',
      code: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "\${GITHUB_TOKEN}" }
    },
    "atlassian": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/sse"]
    }
  }
}`,
    },
  },
  {
    id: 'agent-skills',
    title: 'Agent Skills',
    subtitle: '.cursor/skills/',
    group: 'Skills',
    description:
      'Reusable SKILL.md packs that agents follow instead of improvising. Cuts token waste 30–50% versus unguided prompting.',
    items: [
      { label: 'superdev', value: 'Team simulation — PM, TL, Engineer, QA roles inline' },
      { label: 'digest', value: 'Slack daily/weekly digest with priority tables' },
      { label: 'split-pr', value: 'Split large branches into small reviewable PRs' },
      { label: 'loop', value: 'Run any skill on a recurring interval' },
      { label: 'Token save', value: '30–50% versus unguided agents' },
    ],
    snippet: {
      language: 'md',
      fileName: '.cursor/skills/code-review/SKILL.md',
      code: `---
name: code-review
description: Review a diff for security, performance and scope.
---

Review this diff for:
1. Security — secrets, injection, auth bypass
2. Performance — N+1 queries, unnecessary re-renders
3. Scope — only touch files already in the PR

Output one line per finding, most severe first:
  critical · warning · info`,
    },
  },
  {
    id: 'model-strategy',
    title: 'Model Strategy',
    subtitle: 'When to use which LLM',
    group: 'Patterns',
    description:
      'Match the model to the task — depth versus speed versus cost. No single model wins everything.',
    items: [
      { label: 'Claude', value: 'Multi-file refactors, architecture, long context' },
      { label: 'GPT-4o', value: 'Fast iterations, vision/UI review, batch tasks' },
      { label: 'Gemini', value: 'Research, 1M+ context, cross-model comparison' },
      { label: 'Rule', value: 'Depth → Claude · Speed → GPT · Scale → Gemini' },
    ],
    snippet: {
      language: 'txt',
      fileName: 'model-routing.txt',
      code: `Complex multi-file refactor   ->  Claude (extended thinking)
Architecture decision         ->  Claude
Quick fix / small diff        ->  GPT-4o
UI screenshot review          ->  GPT-4o (vision)
Whole-repo analysis           ->  Gemini (1M context)
Cross-model sanity check      ->  Gemini`,
    },
  },
  {
    id: 'token-patterns',
    title: 'Token-Saving Patterns',
    subtitle: 'Ship more, spend less',
    group: 'Patterns',
    description: 'Concrete patterns that reduce AI cost without reducing output quality.',
    items: [
      { label: 'Batch', value: 'All independent tool calls in one message' },
      { label: 'No re-read', value: 'Never re-read files already in context' },
      { label: 'Rules first', value: 'Cursor rules prevent re-explaining conventions' },
      { label: 'Skill guide', value: 'SKILL.md gives structure, agents don’t improvise' },
      { label: 'Compact', value: 'Show diffs not full files, skip obvious comments' },
    ],
    snippet: {
      language: 'bash',
      fileName: 'batching.sh',
      code: `# One message, three independent reads — not three round trips.
cat src/config/site.ts
grep -rn "useScroll" src/
git log --oneline -10

# Anti-pattern: chaining reads that don't depend on each other
# read A -> wait -> read B -> wait -> read C`,
    },
  },
];
