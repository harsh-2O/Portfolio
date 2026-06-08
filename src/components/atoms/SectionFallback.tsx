import styled from '@emotion/styled';

const Placeholder = styled.div<{ $minHeight: number }>`
  width: 100%;
  min-height: ${({ $minHeight }) => $minHeight}px;
  content-visibility: auto;
`;

interface SectionFallbackProps {
  minHeight?: number;
}

/** Minimal Suspense fallback — avoids layout shift without heavy skeleton UI. */
export default function SectionFallback({ minHeight = 280 }: SectionFallbackProps) {
  return <Placeholder $minHeight={minHeight} aria-hidden="true" />;
}
