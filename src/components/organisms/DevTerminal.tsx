/**
 * Interactive terminal showcasing code patterns & AI-dev workflows
 * visitors can copy and use in their own projects (Cursor, MCP, RAG, etc.).
 */
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SectionHeader from '../molecules/SectionHeader';
import { sectionContainer } from '../../styles/layout';

const SNIPPETS = [
  {
    label: '.cursorrules',
    hint: 'Drop in your project root — guides Cursor AI on your stack',
    lines: [
      '# .cursorrules',
      'You are a senior engineer on a React + TypeScript portfolio.',
      '- Use Emotion styled-components (no component selectors)',
      '- Prefer hooks over class components',
      '- Match existing naming: camelCase files, PascalCase components',
      '- Add comments only for non-obvious animation / security logic',
      '- Never commit secrets (.env, .ssh, API keys)',
    ],
  },
  {
    label: 'mcp.json',
    hint: 'MCP config — plug external tools into Cursor agents',
    lines: [
      '// ~/.cursor/mcp.json',
      '{',
      '  "mcpServers": {',
      '    "github": {',
      '      "command": "npx",',
      '      "args": ["-y", "@modelcontextprotocol/server-github"],',
      '      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }',
      '    }',
      '  }',
      '}',
    ],
  },
  {
    label: 'rag_pipeline.py',
    hint: 'Production RAG pattern — embed, retrieve, generate',
    lines: [
      'from langchain_openai import OpenAIEmbeddings',
      'from langchain_community.vectorstores import PGVector',
      '',
      'store = PGVector(embeddings=OpenAIEmbeddings())',
      'docs = store.similarity_search(query, k=5)',
      'answer = llm.invoke(f"Context: {docs}\\nQ: {query}")',
    ],
  },
  {
    label: 'agent_prompt.md',
    hint: 'Reusable agent skill prompt — works in Cursor & Claude',
    lines: [
      '# Skill: Code Review',
      'Review this diff for:',
      '1. Security — secrets, injection, auth bypass',
      '2. Performance — N+1, unnecessary re-renders',
      '3. Scope — only touch files in the PR',
      'Output: 🔴 critical · 🟡 warning · 🔵 info',
    ],
  },
  {
    label: 'vite.config.ts',
    hint: 'This portfolio stack — copy to start a fast React site',
    lines: [
      'import { defineConfig } from "vite";',
      'import react from "@vitejs/plugin-react";',
      '',
      'export default defineConfig({',
      '  plugins: [react()],',
      '  build: { sourcemap: false, minify: "esbuild" },',
      '});',
    ],
  },
  {
    label: 'exchange_config.go',
    hint: 'Low-latency Go — exchange onboarding at Graviton',
    lines: [
      'func OnboardExchange(cfg ExchangeConfig) error {',
      '    symbols := fetchSymbolMappings(cfg.ID)',
      '    pipeline := NewTickPipeline(cfg.FeedURL)',
      '    return pipeline.Validate(symbols)',
      '}',
    ],
  },
];

const Wrapper = styled(motion.div)`
  ${sectionContainer};
  padding-top: var(--section-padding-top);
  padding-bottom: var(--section-padding-bottom);
`;

const Terminal = styled.div`
  border-radius: 1.25rem;
  border: 1px solid var(--card-border);
  background: #1d1d1f;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 113, 227, 0.08);
  font-family: 'SF Mono', 'Fira Code', 'Menlo', monospace;
  font-size: clamp(0.68rem, 1.8vw, 0.78rem);
  line-height: 1.65;

  :root.dark & {
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const BarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Dot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const FileName = styled.span`
  margin-left: 0.75rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
`;

const CopyButton = styled.button`
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.3rem 0.75rem;
  border-radius: 0.4rem;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
  }
`;

const Body = styled.div`
  padding: clamp(1rem, 3vw, 1.25rem) clamp(0.85rem, 3vw, 1.5rem);
  min-height: 120px;
  color: #f5f5f7;
  overflow-x: auto;
`;

const Hint = styled.p`
  font-family: var(--font-primary);
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.75rem;
  line-height: 1.4;
`;

const Line = styled.div<{ $accent?: boolean; $comment?: boolean }>`
  color: ${({ $accent, $comment }) =>
    $comment ? 'rgba(245,245,247,0.4)' : $accent ? '#5ac8fa' : 'rgba(245, 245, 247, 0.88)'};
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1em;
  background: #34c759;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
  vertical-align: text-bottom;

  @keyframes blink { 50% { opacity: 0; } }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 0.25rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button<{ $active?: boolean }>`
  font-size: var(--text-small);
  font-weight: 500;
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
  white-space: nowrap;
  color: ${({ $active }) => ($active ? '#f5f5f7' : 'var(--text-muted)')};
  background: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--tech-item-bg)')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--accent)' : 'var(--card-border)')};
  transition: all var(--transition);
  font-family: 'SF Mono', 'Fira Code', monospace;
`;

function classifyLine(line: string) {
  if (line.startsWith('#') || line.startsWith('//')) return 'comment';
  if (line.startsWith('$') || line.startsWith('{') || line.startsWith('import')) return 'accent';
  return 'normal';
}

export default function DevTerminal() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();
  const snippet = SNIPPETS[active];

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SNIPPETS.length);
    }, 8000);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const copySnippet = async () => {
    const text = snippet.lines.join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Wrapper
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
    >
      <SectionHeader
        label="Dev workflow"
        title="Tools I build with — copy & use"
        subtitle="Real configs and patterns from my workflow: Cursor rules, MCP servers, RAG pipelines, and agent prompts you can drop into your own projects."
      />

      <Tabs>
        {SNIPPETS.map((s, i) => (
          <Tab key={s.label} $active={i === active} onClick={() => setActive(i)}>
            {s.label}
          </Tab>
        ))}
      </Tabs>

      <Terminal>
        <Bar>
          <BarLeft>
            <Dot $color="#ff5f57" />
            <Dot $color="#febc2e" />
            <Dot $color="#28c840" />
            <FileName>{snippet.label}</FileName>
          </BarLeft>
          <CopyButton onClick={copySnippet} aria-label="Copy snippet">
            {copied ? 'Copied ✓' : 'Copy'}
          </CopyButton>
        </Bar>
        <Body>
          <AnimatePresence mode="wait">
            <motion.div
              key={snippet.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {snippet.lines.map((line, i) => {
                const kind = classifyLine(line);
                return (
                  <Line
                    key={i}
                    $accent={kind === 'accent'}
                    $comment={kind === 'comment'}
                  >
                    {line || '\u00A0'}
                  </Line>
                );
              })}
              <Line><Cursor /></Line>
            </motion.div>
          </AnimatePresence>
        </Body>
      </Terminal>

      <Hint>{snippet.hint}</Hint>
    </Wrapper>
  );
}
