export interface WorkflowCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  accent: string;
  description: string;
  items: WorkflowItem[];
}

export interface WorkflowItem {
  label: string;
  value: string;
  copyable?: string;
}

export const workflowCards: WorkflowCard[] = [
  {
    id: 'cursor-rules',
    title: 'Cursor Rules',
    subtitle: '.cursor/rules/',
    icon: '\u{1F4DC}',
    accent: '#af52de',
    description:
      'Project-level AI rules that persist across sessions. Every repo gets efficiency, commit, and code quality rules so agents never need re-explaining.',
    items: [
      {
        label: 'EFFICIENCY',
        value: 'Batch tool calls, no re-reads, complexity headers',
        copyable:
          '1. Plan FULL set of changes before editing.\n2. Don\'t re-read files already in context.\n3. First response: "Complexity: Low / Medium / High"',
      },
      {
        label: 'COMMITS',
        value: 'HEREDOC messages, no --amend unless safe, verify HEAD',
        copyable:
          'git commit -m "$(cat <<\'EOF\'\nCommit message here.\nEOF\n)"',
      },
      {
        label: 'POST-TASK',
        value: 'AskQuestion loop with 2\u20134 next steps + Stop',
        copyable:
          'After EVERY task: call AskQuestion with 2\u20134 options + "Something else" + "Stop \u2014 I\'m done"',
      },
      {
        label: 'PATH',
        value: '.cursor/rules/*.mdc',
      },
    ],
  },
  {
    id: 'mcp-servers',
    title: 'MCP Servers',
    subtitle: 'Model Context Protocol',
    icon: '\u{1F50C}',
    accent: '#32ade6',
    description:
      'Connect LLMs to real data instead of hallucinating. Each server gives agents read/write access to external systems.',
    items: [
      {
        label: 'ATLASSIAN',
        value: 'Jira issues + Confluence pages (read/write)',
        copyable: 'mcp-atlassian: getJiraIssue, searchJiraIssuesUsingJql, createJiraIssue',
      },
      {
        label: 'SLACK',
        value: 'Daily digests, unresolved threads, meeting prep',
      },
      {
        label: 'GITHUB',
        value: 'PR creation, code review, branch management',
      },
      {
        label: 'IMPACT',
        value: 'Biggest single token-saver in agentic flows',
      },
    ],
  },
  {
    id: 'agent-skills',
    title: 'Agent Skills',
    subtitle: '.cursor/skills/',
    icon: '\u26A1',
    accent: '#ff9500',
    description:
      'Reusable SKILL.md packs that agents follow instead of improvising. Cuts token waste 30\u201350% vs unguided prompting.',
    items: [
      {
        label: 'SUPERDEV',
        value: 'Team simulation \u2014 PM, TL, Engineer, QA roles inline',
        copyable:
          'Activate with /superdev. Assembles roles, presents team, executes inline via TodoWrite. Hard cap: 5 roles.',
      },
      {
        label: 'DIGEST',
        value: 'Slack daily/weekly digest with priority tables',
      },
      {
        label: 'SPLIT-PR',
        value: 'Split large branches into small reviewable PRs',
      },
      {
        label: 'LOOP',
        value: 'Run any skill on a recurring interval',
      },
      {
        label: 'TOKEN_SAVE',
        value: '30\u201350% vs unguided agents',
      },
    ],
  },
  {
    id: 'model-strategy',
    title: 'Model Strategy',
    subtitle: 'When to use which LLM',
    icon: '\u{1F9E0}',
    accent: '#5856d6',
    description:
      'Match the model to the task \u2014 depth vs speed vs cost. No single model wins everything.',
    items: [
      {
        label: 'CLAUDE',
        value: 'Multi-file refactors, architecture, 200K context',
      },
      {
        label: 'GPT-4o',
        value: 'Fast iterations, vision/UI review, batch tasks',
      },
      {
        label: 'GEMINI',
        value: 'Research, 1M+ context, cross-model comparison',
      },
      {
        label: 'RULE',
        value: 'Depth \u2192 Claude | Speed \u2192 GPT | Scale \u2192 Gemini',
        copyable:
          'Complex refactor = Claude Opus\nQuick fix = GPT-4o\nFull repo analysis = Gemini 1M',
      },
    ],
  },
  {
    id: 'token-patterns',
    title: 'Token-Saving Patterns',
    subtitle: 'Ship more, spend less',
    icon: '\u{1F4B0}',
    accent: '#34c759',
    description:
      'Concrete patterns that reduce AI costs without reducing output quality.',
    items: [
      {
        label: 'BATCH',
        value: 'All independent tool calls in one message',
        copyable:
          'Never chain independent reads/searches sequentially. Send parallel tool calls in a single message.',
      },
      {
        label: 'NO_REREAD',
        value: 'Never re-read files already in context',
      },
      {
        label: 'RULES_FIRST',
        value: 'Cursor rules prevent re-explaining conventions',
      },
      {
        label: 'SKILL_GUIDE',
        value: 'SKILL.md gives structure, agents don\'t improvise',
      },
      {
        label: 'COMPACT',
        value: 'Show diffs not full files, skip obvious comments',
      },
    ],
  },
];
