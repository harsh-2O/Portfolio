import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import type { Palette } from '../../theme/tokens';
import { GRID_STEP, layoutMarket } from '../../lib/marketLayout';

interface MarketSceneProps {
  palette: Palette;
  /** Master switch for the frame loop; false renders a single static frame. */
  active: boolean;
  fps?: number;
}

const LADDER_RETARGET_S = 2.4;

/* ── Frame driver: rAF loop capped at `fps`, paused when inactive ─── */

function FrameDriver({ active, fps }: { active: boolean; fps: number }) {
  const advance = useThree((s) => s.advance);

  useEffect(() => {
    if (!active) {
      const id = requestAnimationFrame((t) => advance(t));
      return () => cancelAnimationFrame(id);
    }
    const interval = 1000 / fps;
    let last = 0;
    let raf = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < interval) return;
      last = t;
      advance(t);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, advance, fps]);

  return null;
}

/* ── Shaders for the sparse "tick" points ────────────────────────── */

const pointVertex = /* glsl */ `
  attribute float aPhase;
  attribute float aSpeed;
  uniform float uTime;
  varying float vGlow;
  void main() {
    float pulse = pow(max(0.0, sin(uTime * aSpeed + aPhase)), 14.0);
    vGlow = pulse;
    gl_PointSize = 2.0 + 3.0 * pulse;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const pointFragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  uniform float uBaseAlpha;
  varying float vGlow;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    vec3 col = mix(uBase, uAccent, vGlow);
    gl_FragColor = vec4(col, mix(uBaseAlpha, 0.95, vGlow));
  }
`;

/* ── Scene ───────────────────────────────────────────────────────── */

export default function MarketScene({ palette, active, fps = 30 }: MarketSceneProps) {
  const { width, height } = useThree((s) => s.size);
  const halfW = width / 2;
  const halfH = height / 2;

  const base = useMemo(() => new THREE.Color(palette.textFaint), [palette.textFaint]);
  const accent = useMemo(() => new THREE.Color(palette.accent), [palette.accent]);
  const layout = useMemo(() => layoutMarket(width, height), [width, height]);
  const SPARK_POINTS = layout.sparkline.points;
  const LADDER_ROWS = layout.ladder.rows;

  /* tick points at grid intersections */
  const points = useMemo(() => {
    const cols = Math.ceil(width / GRID_STEP);
    const rows = Math.ceil(height / GRID_STEP);
    const pos: number[] = [];
    const phase: number[] = [];
    const speed: number[] = [];
    // intersections measured from the top-left so they sit on the CSS grid lines
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        pos.push(-halfW + i * GRID_STEP, halfH - j * GRID_STEP, 0.5);
        phase.push(Math.random() * Math.PI * 2);
        speed.push(0.18 + Math.random() * 0.32);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('aPhase', new THREE.Float32BufferAttribute(phase, 1));
    geo.setAttribute('aSpeed', new THREE.Float32BufferAttribute(speed, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: pointVertex,
      fragmentShader: pointFragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uBase: { value: base.clone() },
        uAccent: { value: accent.clone() },
        uBaseAlpha: { value: layout.tickAlpha * layout.alpha },
      },
    });
    return new THREE.Points(geo, mat);
  }, [width, height, halfW, halfH, base, accent, layout]);

  /* drifting sparkline */
  const spark = useMemo(() => {
    const step = (width * 1.1) / (SPARK_POINTS - 1);
    const values = new Float32Array(SPARK_POINTS);
    let v = 0;
    for (let i = 0; i < SPARK_POINTS; i++) {
      v += (Math.random() - 0.5) * 6;
      v *= 0.985;
      values[i] = v;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(SPARK_POINTS * 3), 3));
    const mat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.55 * layout.alpha });
    const line = new THREE.Line(geo, mat);
    return { line, values, step, offset: 0, baseY: layout.sparkline.baseY };
  }, [width, accent, layout, SPARK_POINTS]);

  /* order-book ladder on the right edge */
  const ladder = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1);
    const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.32 * layout.alpha, vertexColors: true });
    const mesh = new THREE.InstancedMesh(geo, mat, LADDER_ROWS);
    const widths = new Float32Array(LADDER_ROWS);
    const targets = new Float32Array(LADDER_ROWS);
    const colors = new Float32Array(LADDER_ROWS * 3);
    for (let i = 0; i < LADDER_ROWS; i++) {
      widths[i] = targets[i] = layout.ladder.min + Math.random() * (layout.ladder.max - layout.ladder.min);
      const c = i < LADDER_ROWS / 2 ? base : accent;
      colors.set([c.r, c.g, c.b], i * 3);
    }
    mesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
    return { mesh, widths, targets, dummy: new THREE.Object3D(), sinceRetarget: 0 };
  }, [base, accent, layout, LADDER_ROWS]);

  /* dispose GPU resources when geometry is rebuilt */
  useEffect(
    () => () => {
      points.geometry.dispose();
      (points.material as THREE.Material).dispose();
      spark.line.geometry.dispose();
      (spark.line.material as THREE.Material).dispose();
      ladder.mesh.geometry.dispose();
      (ladder.mesh.material as THREE.Material).dispose();
    },
    [points, spark, ladder],
  );

  const clock = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    clock.current += dt;

    (points.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.current;

    /* sparkline: scroll left, append a new value when a full step has passed */
    spark.offset += dt * layout.sparkline.speedPxPerSec;
    while (spark.offset >= spark.step) {
      spark.offset -= spark.step;
      spark.values.copyWithin(0, 1);
      const prev = spark.values[SPARK_POINTS - 2];
      spark.values[SPARK_POINTS - 1] = (prev + (Math.random() - 0.5) * 6) * 0.985;
    }
    const pos = spark.line.geometry.getAttribute('position') as THREE.BufferAttribute;
    const startX = -halfW - width * 0.05;
    for (let i = 0; i < SPARK_POINTS; i++) {
      pos.setXYZ(i, startX + i * spark.step - spark.offset, spark.baseY + spark.values[i] * layout.sparkline.amplitude, 1);
    }
    pos.needsUpdate = true;

    /* ladder: ease bar widths toward targets, pick new targets periodically */
    ladder.sinceRetarget += dt;
    if (ladder.sinceRetarget > LADDER_RETARGET_S) {
      ladder.sinceRetarget = 0;
      for (let i = 0; i < LADDER_ROWS; i++) {
        if (Math.random() < 0.45) ladder.targets[i] = layout.ladder.min + Math.random() * (layout.ladder.max - layout.ladder.min);
      }
    }
    const { right, top, gap: LADDER_GAP } = layout.ladder;
    for (let i = 0; i < LADDER_ROWS; i++) {
      ladder.widths[i] += (ladder.targets[i] - ladder.widths[i]) * Math.min(1, dt * 1.6);
      const w = ladder.widths[i];
      ladder.dummy.position.set(right - w / 2, top - i * LADDER_GAP, 0.8);
      ladder.dummy.scale.set(w, 1, 1);
      ladder.dummy.updateMatrix();
      ladder.mesh.setMatrixAt(i, ladder.dummy.matrix);
    }
    ladder.mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <FrameDriver active={active} fps={fps} />
      <primitive object={points} />
      <primitive object={spark.line} />
      <primitive object={ladder.mesh} />
    </>
  );
}
