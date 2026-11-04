"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Заголовок, строки которого поднимаются из-под маски */
export function RevealTitle({
  lines,
  as = "h2",
  className,
  delay = 0,
  animateOnMount = false,
  id,
}: {
  id?: string;
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const trigger = animateOnMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-12% 0px" } };
  return (
    <Tag id={id} className={className} initial={reduce ? false : "hide"} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            variants={{
              hide: { y: "105%" },
              show: { y: 0, transition: { duration: 1.1, ease, delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Мягкое появление блока при скролле */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
