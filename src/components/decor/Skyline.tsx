"use client";

import { motion, type MotionValue } from "motion/react";
import { createContext, useContext, useId, type ReactNode } from "react";

const GlowId = createContext("starGlow");

export const SKY_PALETTES = {
  /** На синем небе, город белый и сливается с белой секцией ниже */
  blue: { far: "#77afef", mid: "#b5d4f8", near: "#ffffff", winFar: "#d6e8fc", winMid: "#ffffff", winNear: "#3b8beb", star: "#ffffff", accent: "#3b8beb", ground: "#ffffff" },
  /** На синем небе, город чёрный и уходит в чёрный футер */
  ink: { far: "#2a73cf", mid: "#18315a", near: "#111318", winFar: "#a9cdf6", winMid: "#d6e8fc", winNear: "#3b8beb", star: "#ffffff", accent: "#3b8beb", ground: "#111318" },
} as const;
type Pal = (typeof SKY_PALETTES)[keyof typeof SKY_PALETTES];
const PalCtx = createContext<Pal>(SKY_PALETTES.blue);

/** Детерминированный генератор, чтобы сервер и клиент рисовали одно и то же */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const GROUND = 440;

function star(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function KremlinStar({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const glow = useContext(GlowId);
  const p = useContext(PalCtx);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 3.2} fill={`url(#${glow})`} />
      <polygon points={star(cx, cy, r)} fill={p.star} />
    </g>
  );
}

function onion(cx: number, base: number, w: number, h: number) {
  return `M ${cx - w / 2} ${base} C ${cx - w * 0.78} ${base - h * 0.42} ${cx - w * 0.18} ${base - h * 0.62} ${cx} ${base - h} C ${cx + w * 0.18} ${base - h * 0.62} ${cx + w * 0.78} ${base - h * 0.42} ${cx + w / 2} ${base} Z`;
}

function Wall({ x0, x1, top }: { x0: number; x1: number; top: number }) {
  let d = `M ${x0} ${GROUND} L ${x0} ${top}`;
  const step = 20;
  for (let x = x0; x < x1; x += step) {
    // зубец «ласточкин хвост»
    d += ` L ${x + 4} ${top} L ${x + 4} ${top - 14} L ${x + 9} ${top - 8} L ${x + 14} ${top - 14} L ${x + 14} ${top} L ${x + step} ${top}`;
  }
  d += ` L ${x1} ${GROUND} Z`;
  return <path d={d} fill={useContext(PalCtx).near} />;
}

function TentTower({ cx, base, w, h, tent }: { cx: number; base: number; w: number; h: number; tent: number }) {
  const top = base - h;
  const p = useContext(PalCtx);
  return (
    <g fill={p.near}>
      <rect x={cx - w / 2} y={top} width={w} height={GROUND - top} />
      <rect x={cx - w * 0.36} y={top - 18} width={w * 0.72} height={20} />
      <polygon points={`${cx - w * 0.36},${top - 18} ${cx + w * 0.36},${top - 18} ${cx},${top - 18 - tent}`} />
      <KremlinStar cx={cx} cy={top - 24 - tent} r={6} />
    </g>
  );
}

function Windows({ x, y, w, h, seed, cols, rows, color = "#ffffff" }: { x: number; y: number; w: number; h: number; seed: number; cols: number; rows: number; color?: string }) {
  const r = rng(seed);
  const out: ReactNode[] = [];
  const cw = w / cols;
  const rh = h / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const v = r();
      if (v > 0.42) continue;
      out.push(
        <rect
          key={`${i}-${j}`}
          x={x + i * cw + cw * 0.3}
          y={y + j * rh + rh * 0.28}
          width={cw * 0.4}
          height={rh * 0.42}
          fill={color}
          opacity={0.35 + v}
          className={v < 0.05 ? "animate-flicker" : undefined}
          style={v < 0.05 ? { animationDelay: `${(i + j) % 7}s` } : undefined}
        />,
      );
    }
  }
  return <>{out}</>;
}

function FarCity() {
  const p = useContext(PalCtx);
  const towers: [number, number, number][] = [
    [1150, 44, 210], [1200, 38, 290], [1244, 56, 345], [1306, 40, 270],
    [1352, 60, 318], [1418, 36, 246], [1460, 50, 205], [1516, 42, 168],
  ];
  return (
    <g>
      {towers.map(([x, w, h], i) => {
        const top = GROUND - h;
        const slant = i % 2 === 0 ? 14 : -10;
        return (
          <g key={x}>
            <polygon points={`${x},${GROUND} ${x},${top + Math.max(0, slant)} ${x + w},${top + Math.max(0, -slant)} ${x + w},${GROUND}`} fill={p.far} />
            <Windows x={x + 4} y={top + 20} w={w - 8} h={h - 40} seed={i + 11} cols={4} rows={Math.round(h / 14)} color={p.winFar} />
          </g>
        );
      })}
    </g>
  );
}

function MidCity() {
  const p = useContext(PalCtx);
  const r = rng(7);
  const houses: ReactNode[] = [];
  let x = -20;
  let k = 0;
  while (x < 1620) {
    const w = 46 + Math.round(r() * 60);
    const h = 70 + Math.round(r() * 60);
    const top = GROUND - h;
    houses.push(
      <g key={k}>
        <rect x={x} y={top} width={w} height={h} fill={p.mid} />
        <Windows x={x} y={top + 6} w={w} h={h - 10} seed={k + 40} cols={Math.max(2, Math.round(w / 14))} rows={Math.round(h / 16)} color={p.winMid} />
      </g>,
    );
    x += w + 2;
    k++;
  }
  // Высотка с шпилем
  const cx = 300;
  return (
    <g>
      {houses}
      <g fill={p.mid}>
        <rect x={120} y={330} width={360} height={110} />
        <rect x={190} y={290} width={220} height={150} />
        <rect x={228} y={238} width={144} height={60} />
        <rect x={256} y={186} width={88} height={60} />
        <rect x={276} y={144} width={48} height={50} />
        <rect x={289} y={110} width={22} height={40} />
        <polygon points={`${cx - 7},112 ${cx + 7},112 ${cx},40`} />
      </g>
      <Windows x={196} y={296} w={208} h={140} seed={3} cols={14} rows={9} color={p.winMid} />
      <Windows x={232} y={244} w={136} h={50} seed={5} cols={9} rows={3} color={p.winMid} />
      <Windows x={260} y={192} w={80} h={50} seed={9} cols={5} rows={3} color={p.winMid} />
      <KremlinStar cx={cx} cy={36} r={5} />
    </g>
  );
}

function NearCity() {
  const p = useContext(PalCtx);
  const sv = 930;
  return (
    <g>
      <Wall x0={-10} x1={1130} top={374} />
      <TentTower cx={150} base={330} w={44} h={10} tent={70} />
      <TentTower cx={470} base={318} w={52} h={14} tent={86} />

      {/* Спасская башня */}
      <g fill={p.near}>
        <rect x={658} y={236} width={84} height={204} />
        <rect x={667} y={184} width={66} height={56} />
        <rect x={676} y={142} width={48} height={46} />
        <rect x={683} y={112} width={34} height={34} />
        <polygon points="683,112 717,112 700,40" />
      </g>
      <circle cx={700} cy={211} r={15} fill={p.accent} />
      <circle cx={700} cy={211} r={12} fill={p.near} />
      <line x1={700} y1={211} x2={700} y2={202} stroke={p.accent} strokeWidth={2} />
      <line x1={700} y1={211} x2={707} y2={211} stroke={p.accent} strokeWidth={2} />
      {[690, 700, 710].map((ax) => (
        <rect key={ax} x={ax - 2.5} y={156} width={5} height={14} rx={2.5} fill={p.accent} opacity={0.7} />
      ))}
      <KremlinStar cx={700} cy={32} r={8} />

      {/* Собор Василия Блаженного */}
      <g fill={p.near}>
        <rect x={850} y={340} width={170} height={100} />
        <rect x={sv - 13} y={232} width={26} height={110} />
        <polygon points={`${sv - 17},234 ${sv + 17},234 ${sv},152`} />
        <path d={onion(sv, 156, 12, 20)} />
        {(
          [
            [870, 300, 34, 54],
            [900, 278, 30, 48],
            [962, 278, 32, 50],
            [996, 304, 34, 52],
          ] as const
        ).map(([cx, base, w, h]) => (
          <g key={cx}>
            <rect x={cx - w * 0.3} y={base - 2} width={w * 0.6} height={GROUND - base} />
            <path d={onion(cx, base, w, h)} />
            <rect x={cx - 1} y={base - h - 14} width={2} height={16} />
            <rect x={cx - 5} y={base - h - 10} width={10} height={2} />
          </g>
        ))}
      </g>
      <Windows x={856} y={350} w={160} h={70} seed={21} cols={10} rows={3} color={p.winNear} />

      {/* Главная ёлка */}
      <g>
        <polygon points="1086,286 1124,350 1048,350" fill={p.near} />
        <polygon points="1086,318 1140,398 1032,398" fill={p.near} />
        <polygon points="1086,352 1156,440 1016,440" fill={p.near} />
        <polygon points={star(1086, 280, 9)} fill={p.accent} />
        {Array.from({ length: 22 }, (_, i) => {
          const r = rng(i + 90);
          const t = r();
          const yy = 300 + t * 135;
          const half = ((yy - 286) / 154) * 64;
          const xx = 1086 + (r() * 2 - 1) * half * 0.9;
          const c = [p.accent, p.winNear, p.accent][i % 3];
          return (
            <circle key={i} cx={xx} cy={yy} r={2.2} fill={c} className="animate-twinkle" style={{ animationDelay: `${(i * 0.41) % 3}s` }} />
          );
        })}
      </g>
    </g>
  );
}

type SkylineProps = {
  className?: string;
  palette?: keyof typeof SKY_PALETTES;
  farY?: MotionValue<number>;
  midY?: MotionValue<number>;
};

/** Силуэт новогодней Москвы в три плана для параллакса */
export function Skyline({ className, farY, midY, palette = "blue" }: SkylineProps) {
  const p = SKY_PALETTES[palette];
  const uid = useId().replace(/:/g, "");
  const glow = `${uid}-glow`;
  const fade = `${uid}-fade`;
  return (
    <PalCtx.Provider value={p}>
    <GlowId.Provider value={glow}>
    <svg viewBox={`0 0 1600 ${GROUND}`} className={className} preserveAspectRatio="xMidYMax slice" aria-hidden>
      <defs>
        <radialGradient id={glow}>
          <stop offset="0%" stopColor={p.star} stopOpacity="0.6" />
          <stop offset="100%" stopColor={p.star} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={fade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.ground} stopOpacity="0" />
          <stop offset="100%" stopColor={p.ground} stopOpacity="1" />
        </linearGradient>
      </defs>
      <motion.g style={{ y: farY }}>
        <FarCity />
      </motion.g>
      <motion.g style={{ y: midY }}>
        <MidCity />
      </motion.g>
      <NearCity />
      <rect x="0" y={GROUND - 36} width="1600" height="36" fill={`url(#${fade})`} />
    </svg>
    </GlowId.Provider>
    </PalCtx.Provider>
  );
}
