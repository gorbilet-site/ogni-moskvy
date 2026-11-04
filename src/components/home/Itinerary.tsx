"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { itinerary } from "@/data/guide";
import { getOffer } from "@/data/offers";
import { OfferLink } from "@/components/offers/Ticket";
import { SINGLE, links, site, withUtm } from "@/lib/site";
import { RevealTitle } from "@/components/ui/Reveal";
import { ButtonLink, cn } from "@/components/ui/primitives";

const ease = [0.16, 1, 0.3, 1] as const;

export function Itinerary() {
  const [day, setDay] = useState(0);
  const d = itinerary[day];

  return (
    <section id="marshrut" className="relative overflow-hidden bg-paper py-16 sm:py-32" aria-labelledby="route-title">
      <div className="shell grid gap-8 sm:gap-14 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <RevealTitle
            id="route-title"
            lines={["Соберите свою", "новогоднюю Москву"]}
            className="display text-[clamp(1.45rem,2.9vw,2.6rem)] text-ink"
          />
          <p className="mt-6 max-w-sm text-lg leading-[1.45] text-ink/70">Пример программы на три дня. Повторите целиком или возьмите отдельные дни.</p>

          <div role="tablist" aria-label="Дни маршрута" className="mt-8 grid grid-cols-3 rounded-full bg-white p-1.5 ring-1 ring-ink/10 sm:mt-10 sm:inline-flex">
            {itinerary.map((it, i) => (
              <button
                key={it.id}
                role="tab"
                id={`day-tab-${i}`}
                aria-selected={i === day}
                aria-controls="day-panel"
                onClick={() => setDay(i)}
                className={cn(
                  "relative min-h-12 rounded-full px-2 text-base font-bold transition-colors duration-300 sm:px-5 sm:text-[1.1875rem]",
                  i === day ? "text-ink" : "text-ink/70 hover:text-ink",
                )}
              >
                {i === day && <motion.span layoutId="day-pill" className="absolute inset-0 rounded-full bg-blue" transition={{ duration: 0.5, ease }} />}
                <span className="relative">День {i + 1}</span>
              </button>
            ))}
          </div>

          <div className="mt-10">
            {SINGLE ? (
              <ButtonLink href={withUtm(site.gorbiletMoscow)} external variant="outline">
                Вся афиша Москвы
              </ButtonLink>
            ) : (
              <ButtonLink href={links.route} variant="outline">
                Маршрут с подробностями
              </ButtonLink>
            )}
          </div>
        </div>

        <div id="day-panel" role="tabpanel" aria-labelledby={`day-tab-${day}`} className="min-w-0 lg:col-span-6 lg:col-start-7">
          <AnimatePresence mode="wait">
            <motion.div key={d.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5, ease }}>
              <p className="text-[0.95rem] font-semibold text-blue-deep">День {day + 1}</p>
              <h3 className="display mt-3 text-[clamp(1.2rem,5.8vw,1.45rem)] text-ink sm:text-[clamp(1.4rem,3vw,2.6rem)]">{d.title}</h3>
              <p className="mt-3 text-lg text-ink/65">{d.mood}</p>

              <ol className="relative mt-10 grid gap-1">
                <motion.span
                  aria-hidden
                  className="absolute left-[0.6875rem] top-4 bottom-4 w-px origin-top bg-gradient-to-b from-blue via-blue to-blue/20"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.1, ease, delay: 0.15 }}
                />
                {d.stops.map((s, i) => {
                  const o = s.offer ? getOffer(s.offer) : undefined;
                  return (
                    <motion.li
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.1 }}
                      className="relative flex min-w-0 items-center gap-3 py-3 sm:gap-5"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "relative z-10 grid size-6 shrink-0 place-items-center rounded-full ring-4 ring-paper",
                          o ? "bg-blue shadow-[0_0_18px_rgb(59_139_235/0.55)]" : "bg-white ring-1 ring-ink/15",
                        )}
                      >
                        <span className={cn("size-2 rounded-full", o ? "bg-white" : "bg-ink/30")} />
                      </span>
                      {o ? (
                        <OfferLink
                          offer={o}
                          className="group flex min-w-0 flex-1 items-center justify-between gap-3 rounded-2xl bg-white px-3 py-4 ring-1 ring-ink/10 transition-[box-shadow] hover:shadow-[0_16px_40px_-24px_rgb(17_19_24/0.45)] sm:gap-4 sm:px-5"
                        >
                          <span className="min-w-0">
                            <span className="block font-bold text-ink">{s.label}</span>
                            <span className="mt-0.5 block text-sm font-medium text-mute">{o.kind}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-3">
                            {o.discount && <span className="display hidden text-base text-blue-deep tabular-nums sm:inline">-{o.discount}%</span>}
                            <ArrowUpRight className="size-4 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                          </span>
                        </OfferLink>
                      ) : (
                        <span className="text-lg font-medium text-ink/80">{s.label}</span>
                      )}
                    </motion.li>
                  );
                })}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
