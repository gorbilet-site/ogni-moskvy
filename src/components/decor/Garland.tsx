"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

/**
 * Палитра лампочек в цветах кампании.
 * На синем горят белые лампы, на белом горят синие.
 */
const TONES = {
  blue: { lit: ["#ffffff", "#ffffff", "#e4effc"], glow: "#ffffff", off: "#6ea9f0", offStroke: "#b5d3f7", wire: "rgba(17,19,24,.35)", cap: "#111318" },
  light: { lit: ["#3b8beb", "#3b8beb", "#1d6fd6"], glow: "#3b8beb", off: "#ffffff", offStroke: "#c9d2de", wire: "#c3ccd8", cap: "#8a929e" },
  dark: { lit: ["#3b8beb", "#ffffff", "#3b8beb"], glow: "#3b8beb", off: "#2b2f37", offStroke: "#454a55", wire: "#3a3f49", cap: "#454a55" },
} as const;

type GarlandProps = {
  bulbs: number;
  /** Какие лампочки горят. true = все */
  lit: boolean[] | true;
  swags?: number;
  depth?: number;
  /** Зажигать по очереди при появлении */
  sequence?: boolean;
  className?: string;
  label?: string;
  /** Масштаб лампочек относительно провода */
  bulbScale?: number;
  tone?: keyof typeof TONES;
};

export function Garland({
  bulbs,
  lit,
  swags = 3,
  depth = 46,
  sequence = false,
  className,
  label,
  bulbScale = 1,
  tone = "blue",
}: GarlandProps) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const t = TONES[tone];
  const W = 1000;
  const top = 14;
  const seg = W / swags;

  let d = `M 0 ${top}`;
  for (let s = 0; s < swags; s++) {
    const x0 = s * seg;
    d += ` Q ${x0 + seg / 2} ${top + depth * 2} ${x0 + seg} ${top}`;
  }

  const items = Array.from({ length: bulbs }, (_, i) => {
    const x = ((i + 0.5) / bulbs) * W;
    const u = (x % seg) / seg;
    const slope = (2 * (1 - 2 * u) * depth * 2) / seg;
    return {
      x,
      y: top + 2 * u * (1 - u) * depth * 2,
      angle: (Math.atan(slope) * 180) / Math.PI,
      color: t.lit[i % t.lit.length],
    };
  });

  return (
    <svg
      viewBox={`0 -4 ${W} ${top + depth + 52 * bulbScale}`}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor={t.glow} stopOpacity="0.8" />
          <stop offset="40%" stopColor={t.glow} stopOpacity="0.22" />
          <stop offset="100%" stopColor={t.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={d} fill="none" stroke={t.wire} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      {items.map((b, i) => {
        const on = lit === true ? true : Boolean(lit[i]);
        const delay = sequence && !reduce ? 0.3 + i * 0.08 : 0;
        return (
          <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.angle * 0.45}) scale(${bulbScale})`}>
            <rect x="-4" y="-2" width="8" height="9" rx="1.5" fill={t.cap} />
            <motion.circle
              cx="0"
              cy="20"
              r="28"
              fill={`url(#${id}-glow)`}
              initial={false}
              animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.4 }}
              transition={{ duration: reduce ? 0 : 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "0px 20px" }}
            />
            <motion.ellipse
              cx="0"
              cy="18"
              rx="6.5"
              ry="10"
              initial={false}
              animate={{ fill: on ? b.color : t.off }}
              stroke={on ? "none" : t.offStroke}
              strokeWidth={1.2}
              transition={{ duration: reduce ? 0 : 0.35, delay }}
              className={on && !reduce ? "animate-twinkle" : undefined}
              style={{ animationDelay: `${(i * 0.37) % 3}s` }}
            />
            <ellipse cx="-2" cy="13" rx="1.6" ry="3" fill="#fff" opacity={on ? 0.75 : 0.35} />
          </g>
        );
      })}
    </svg>
  );
}
