import styled from '@emotion/styled';

/* 160px tile of fractal noise, desaturated. Felt, not seen. */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Grain = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9000;
  pointer-events: none;
  background-image: ${NOISE};
  background-repeat: repeat;
  background-size: 160px 160px;
  opacity: var(--grain-opacity);
  mix-blend-mode: multiply;

  :root.dark & {
    mix-blend-mode: screen;
  }
`;

export default function GrainOverlay() {
  return <Grain aria-hidden="true" />;
}
