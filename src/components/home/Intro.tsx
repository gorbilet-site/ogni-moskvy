"use client";

import { motion, useReducedMotion } from "motion/react";
import { discountOf, getOffer } from "@/data/offers";
import { OfferPhoto } from "@/components/offers/Ticket";
import { Mascot } from "@/components/brand/Mascot";
import { FadeIn, RevealTitle } from "@/components/ui/Reveal";

/** Веер из новогодних предложений: впереди самое праздничное */
const fan = ["novogodnyaya-moskva", "tsirk-deda-moroza", "novogodnyaya-skazka-v-gorode"] as const;
const fanStyle = [
  { rotate: -12, x: -96, y: 10, bg: "bg-ink text-white" },
  { rotate: 1, x: 0, y: -16, bg: "bg-blue text-ink" },
  { rotate: 12, x: 96, y: 20, bg: "bg-white text-ink ring-1 ring-ink/10" },
];

export function Intro() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-10 sm:pb-36 sm:pt-16" aria-labelledby="intro-title">
      <div className="shell grid items-center gap-8 sm:gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <RevealTitle id="intro-title" lines={["Самые выгодные", "билеты уже собрали"]} className="display text-[clamp(1.45rem,3.4vw,3rem)] text-ink" />
          <FadeIn delay={0.15}>
            <p className="mt-6 max-w-lg text-lg leading-[1.45] text-ink/80 sm:mt-8 sm:text-xl">
              Продумайте новогодние каникулы заранее. Мы собрали билеты на экскурсии, спектакли, ёлки и развлечения со скидками.
            </p>
            <p className="mt-4 max-w-lg text-lg leading-[1.45] text-ink/80 sm:text-xl">Чтобы на каникулах осталось только наслаждаться каждым днём, а не планировать.</p>
          </FadeIn>

        </div>

        <div className="relative mx-auto h-[19rem] w-full max-w-md min-[375px]:h-[21rem] sm:h-[28rem] lg:col-span-5 lg:col-start-8">
          <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] origin-top -translate-x-1/2 scale-[0.58] min-[375px]:scale-[0.68] sm:scale-100" aria-hidden>
            {fan.map((slug, i) => {
              const o = getOffer(slug)!;
              const s = fanStyle[i];
              return (
                <motion.div
                  key={slug}
                  className={`absolute left-1/2 top-[44%] flex h-[19rem] w-[15.5rem] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-28px_rgb(17_19_24/0.55)] ${s.bg}`}
                  initial={reduce ? false : { rotate: 0, x: 0, y: 60, opacity: 0 }}
                  whileInView={{ rotate: s.rotate, x: s.x, y: s.y, opacity: 1 }}
                  whileHover={reduce ? undefined : { y: s.y - 18, rotate: s.rotate * 0.5, zIndex: 5 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                  style={{ zIndex: i }}
                >
                  <OfferPhoto offer={o} className="h-36 shrink-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[1.25rem] font-bold leading-[1.15]">{o.title}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-dashed border-current/30 pt-3 text-sm font-semibold">
                      <span className="opacity-75">{o.kind}</span>
                      <span className="display text-base">-{discountOf(o)}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <motion.div
              className="absolute -bottom-6 left-0 z-10 w-36 sm:w-44"
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              <Mascot pose="ticket" className="w-full drop-shadow-[0_18px_20px_rgb(17_19_24/0.25)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
