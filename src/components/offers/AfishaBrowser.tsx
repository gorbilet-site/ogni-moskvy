"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories, offers, type Category } from "@/data/offers";
import { TicketWide } from "./Ticket";
import { cn } from "@/components/ui/primitives";
import { plural } from "@/lib/plural";

type Filter = Category | "all";
const keys = ["all", ...(Object.keys(categories) as Category[])] as const;

export function AfishaGrid({ filter }: { filter: Filter }) {
  const list = filter === "all" ? offers : offers.filter((o) => o.category === filter);
  return (
    <motion.ul layout className="grid gap-5 lg:grid-cols-2">
      <AnimatePresence mode="popLayout" initial={false}>
        {list.map((o) => (
          <motion.li
            key={o.slug}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <TicketWide offer={o} notch="bg-white" />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export function AfishaBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const raw = params.get("kategoriya");
  const filter: Filter = raw && raw in categories ? (raw as Category) : "all";
  const count = filter === "all" ? offers.length : offers.filter((o) => o.category === filter).length;

  const set = (f: Filter) => {
    const url = f === "all" ? "/afisha" : `/afisha?kategoriya=${f}`;
    router.replace(url, { scroll: false });
  };

  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <LayoutGroup>
          <div role="group" aria-label="Фильтр по категориям" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {keys.map((k) => {
              const on = k === filter;
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set(k)}
                  className={cn(
                    "relative min-h-12 shrink-0 rounded-full px-5 text-base font-semibold ring-1 transition-colors duration-300",
                    on ? "text-white ring-transparent" : "text-ink/75 ring-ink/15 hover:text-ink hover:ring-ink/40",
                  )}
                >
                  {on && <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-blue" transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} />}
                  <span className="relative">{k === "all" ? "Все" : categories[k].short}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <p className="text-sm text-ink/50" aria-live="polite">
          {count} {plural(count, ["предложение", "предложения", "предложений"])}
        </p>
      </div>
      <div className="mt-10">
        <AfishaGrid filter={filter} />
      </div>
    </>
  );
}
