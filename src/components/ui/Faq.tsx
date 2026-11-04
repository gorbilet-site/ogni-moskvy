"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "./primitives";

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <ul className="border-t border-ink/12">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <li key={it.q} className="border-b border-ink/12">
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${base}-${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-ink transition-colors hover:text-blue-deep sm:text-xl"
              >
                {it.q}
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-ink/20 transition-transform duration-500 ease-out-expo", on && "rotate-45 bg-blue text-white ring-blue")}>
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${base}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-2xl pb-6 leading-relaxed text-ink/70">{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
