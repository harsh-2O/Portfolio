import { useMemo } from 'react';
import styled from '@emotion/styled';
import { motion } from '../../lib/motion';

interface RadarSkill {
  name: string;
  level: number;
  demand: number;
}

interface RadarChartProps {
  skills: RadarSkill[];
  accent: string;
}

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  font-family: 'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace;
`;

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleRad: number,
): [number, number] {
  return [cx + r * Math.cos(angleRad), cy + r * Math.sin(angleRad)];
}

function buildPolygonPoints(
  cx: number,
  cy: number,
  radius: number,
  values: number[],
  maxValue: number,
): string {
  const n = values.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;
  return values
    .map((v, i) => {
      const r = (v / maxValue) * radius;
      const [x, y] = polarToCartesian(cx, cy, r, startAngle + i * angleStep);
      return `${x},${y}`;
    })
    .join(' ');
}

export default function RadarChart({ skills, accent }: RadarChartProps) {
  const top = useMemo(() => {
    const sorted = [...skills].sort((a, b) => b.demand - a.demand);
    return sorted.slice(0, Math.min(8, sorted.length));
  }, [skills]);

  const radius = 150;
  const pad = 60;
  const legendH = 28;
  const chartArea = radius * 2;
  const totalW = chartArea + pad * 2;
  const totalH = chartArea + pad * 2 + legendH;
  const cx = totalW / 2;
  const cy = pad + radius;
  const rings = 4;
  const n = top.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  const gridRings = Array.from({ length: rings }, (_, i) =>
    ((i + 1) / rings) * radius,
  );

  const axes = top.map((_, i) => {
    const angle = startAngle + i * angleStep;
    const [x, y] = polarToCartesian(cx, cy, radius + 4, angle);
    return { x, y, angle };
  });

  const levelPoints = buildPolygonPoints(
    cx, cy, radius,
    top.map((s) => s.level), 100,
  );
  const demandPoints = buildPolygonPoints(
    cx, cy, radius,
    top.map((s) => s.demand), 100,
  );

  const labelPositions = top.map((skill, i) => {
    const angle = startAngle + i * angleStep;
    const labelR = radius + 22;
    const [x, y] = polarToCartesian(cx, cy, labelR, angle);
    let anchor: 'middle' | 'start' | 'end' = 'middle';
    if (x < cx - 10) anchor = 'end';
    else if (x > cx + 10) anchor = 'start';
    return { skill, x, y, anchor };
  });

  const legendY = chartArea + pad * 2 + 4;

  return (
    <Wrapper>
      <svg viewBox={`0 0 ${totalW} ${totalH}`} width="100%">
        {gridRings.map((r) => (
          <polygon
            key={r}
            points={buildPolygonPoints(cx, cy, r, Array(n).fill(100), 100)}
            fill="none"
            stroke="var(--card-border)"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}

        {axes.map((a, i) => (
          <line
            key={i}
            x1={cx} y1={cy} x2={a.x} y2={a.y}
            stroke="var(--card-border)"
            strokeWidth="1"
            opacity="0.35"
          />
        ))}

        <motion.polygon
          points={demandPoints}
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.5"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        <motion.polygon
          points={levelPoints}
          fill={`${accent}18`}
          stroke={accent}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {top.map((skill, i) => {
          const angle = startAngle + i * angleStep;
          const r = (skill.level / 100) * radius;
          const [dx, dy] = polarToCartesian(cx, cy, r, angle);
          return (
            <motion.circle
              key={skill.name}
              cx={dx} cy={dy} r="3.5"
              fill={accent}
              stroke="var(--surface-elevated)"
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
            />
          );
        })}

        {labelPositions.map(({ skill, x, y, anchor }) => (
          <text
            key={skill.name}
            x={x} y={y}
            textAnchor={anchor}
            dominantBaseline="central"
            fill="var(--text-muted)"
            fontSize="10.5"
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight="500"
          >
            {skill.name}
          </text>
        ))}

        {gridRings.map((r, i) => (
          <text
            key={`ring-${i}`}
            x={cx + 4} y={cy - r + 2}
            fontSize="8"
            fill="var(--text-muted)"
            opacity="0.4"
            fontFamily="'IBM Plex Mono', monospace"
          >
            {Math.round(((i + 1) / rings) * 100)}
          </text>
        ))}

        {/* Legend */}
        <line
          x1={totalW / 2 - 82} y1={legendY}
          x2={totalW / 2 - 68} y2={legendY}
          stroke={accent} strokeWidth="2.5"
        />
        <text
          x={totalW / 2 - 63} y={legendY + 1}
          fontSize="9" fontWeight="600" fill="var(--text-muted)"
          fontFamily="'IBM Plex Mono', monospace"
          dominantBaseline="central"
          letterSpacing="0.04em"
        >
          YOU
        </text>

        <line
          x1={totalW / 2 + 14} y1={legendY}
          x2={totalW / 2 + 28} y2={legendY}
          stroke="var(--text-muted)" strokeWidth="1.5"
          strokeDasharray="3 2" opacity="0.6"
        />
        <text
          x={totalW / 2 + 33} y={legendY + 1}
          fontSize="9" fontWeight="600" fill="var(--text-muted)"
          fontFamily="'IBM Plex Mono', monospace"
          dominantBaseline="central"
          letterSpacing="0.04em"
        >
          DEMAND
        </text>
      </svg>
    </Wrapper>
  );
}
