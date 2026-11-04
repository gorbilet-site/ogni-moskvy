"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Baby, Camera, Compass, Sparkles, Users } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { situations, type Situation } from "@/data/guide";
import { getOffer } from "@/data/offers";
import { BuyLink, TicketMini } from "@/components/offers/Ticket";
import { Mascot } from "@/components/brand/Mascot";
import { RevealTitle } from "@/components/ui/Reveal";
import { cn } from "@/components/ui/primitives";

const icons: Record<Situation["icon"], typeof Compass> = {
  compass: Compass,
  users: Users,
  camera: Camera,
  baby: Baby,
  sparkles: Sparkles,
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Navigator() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = situations[active];
  const main = getOffer(s.offers[0])!;

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + situations.length) % situations.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="relative bg-blue py-16 text-ink sm:py-32" aria-labelledby="nav-title">
      {/* Прозрачный маскот выглядывает из-за края секции, без растровой таблички. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-3 z-10 w-32 -translate-y-[84%] sm:left-[10%] sm:w-60"
        initial={reduce ? false : { y: 60 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, ease, delay: 0.1 }}
      >
        <Mascot pose="peek" className="w-full" />
      </motion.div>

      <div className="shell relative grid gap-8 sm:gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <RevealTitle id="nav-title" lines={["Что выбрать", "для своей поездки?"]} className="display text-[clamp(1.45rem,2.9vw,2.6rem)]" />
          <p className="mt-6 max-w-sm text-xl font-bold leading-[1.3]">Выберите, с кем и зачем едете. Подскажем, с чего начать.</p>

          <div role="tablist" aria-orientation="vertical" aria-label="Ситуации" className="mt-10 grid gap-1.5" onKeyDown={onKey}>
            {situations.map((it, i) => {
              const Icon = icons[it.icon];
              const on = i === active;
              return (
                <button
                  key={it.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${it.id}`}
                  aria-selected={on}
                  aria-controls="nav-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative flex min-h-14 items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-bold transition-colors duration-300 sm:gap-4 sm:px-5 sm:text-[1.1875rem]",
                    on ? "text-ink" : "text-ink hover:bg-white/25",
                  )}
                >
                  {on && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-2xl bg-white" transition={{ duration: 0.5, ease }} />}
                  <Icon className="relative size-5 shrink-0" strokeWidth={2} aria-hidden />
                  <span className="relative">{it.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 lg:col-span-6 lg:col-start-7">
          <div id="nav-panel" role="tabpanel" aria-labelledby={`tab-${s.id}`} className="relative overflow-hidden rounded-[2rem] bg-white p-5 text-ink sm:min-h-[26rem] sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease }}
                className="flex h-full flex-col"
              >
                <p className="text-[0.95rem] font-semibold text-blue-deep">{s.label}. Начните с этого</p>
                <h3 className="mt-5 text-2xl font-bold leading-[1.2] text-ink sm:font-display sm:text-[clamp(1.4rem,2.8vw,2.3rem)] sm:font-medium">{main.title}</h3>
                <p className="mt-5 max-w-md text-lg leading-[1.45] text-ink/75">{s.note}</p>
                <div className="mt-8 grid gap-3">
                  {s.offers.map((slug) => (
                    <TicketMini key={slug} offer={getOffer(slug)!} />
                  ))}
                </div>
                <div className="mt-8">
                  <BuyLink offer={main} tone="light" className="w-full sm:w-auto" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
