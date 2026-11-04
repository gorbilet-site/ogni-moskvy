"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { links } from "@/lib/site";
import { byCategory } from "@/data/offers";
import { TicketTall } from "@/components/offers/Ticket";
import { Mascot } from "@/components/brand/Mascot";
import { FadeIn, RevealTitle } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/primitives";

/** Сугроб, мягкий переход между секциями */
export function Drift({ flip = false, fill = "#ffffff", className = "" }: { flip?: boolean; fill?: string; className?: string }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={`block h-14 w-full sm:h-20 ${flip ? "rotate-180" : ""} ${className}`} aria-hidden>
      <path d="M0 90V52c90-26 170-34 260-18s150 30 250 10 160-48 270-38 170 44 280 40 160-34 230-38 100 6 150 14V90Z" fill={fill} />
    </svg>
  );
}

export function Kids() {
  const list = byCategory("kids");
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // кот проходит по сугробу, пока секция прокручивается
  const catX = useTransform(scrollYProgress, [0, 1], reduce ? ["70%", "70%"] : ["-10%", "110%"]);

  return (
    <section id="yolki" className="relative" aria-labelledby="kids-title">
      <div className="bg-blue">
        <Drift />
      </div>
      <div className="bg-white pb-28 pt-10 text-ink sm:pb-36 sm:pt-16">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <RevealTitle
              id="kids-title"
              lines={["Пока дети ждут", "Деда Мороза,", "выбираем ёлку"]}
              className="display text-[clamp(1.45rem,3.4vw,3rem)] text-ink lg:col-span-7"
            />
            <FadeIn className="lg:col-span-4 lg:col-start-9">
              <p className="text-lg leading-[1.45] text-ink/75">
                Цирк, сказка, любимые герои или шоу с научными опытами. Перед покупкой проверьте возраст и время сеанса на странице билета.
              </p>
              {links.yolkaGuide && (
                <ButtonLink href={links.yolkaGuide} variant="ink" className="mt-6">
                  Как выбрать ёлку
                </ButtonLink>
              )}
            </FadeIn>
          </div>
        </div>

        <ul className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 md:mx-auto md:grid md:max-w-[88rem] md:grid-cols-2 md:overflow-visible md:px-10 lg:grid-cols-4 lg:gap-5">
          {list.map((o, i) => (
            <li key={o.slug} className="w-[82vw] max-w-sm shrink-0 snap-start md:w-auto md:max-w-none">
              <FadeIn delay={i * 0.07} className="h-full">
                <TicketTall offer={o} />
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>

      <div ref={ref} className="relative bg-ink">
        <Drift flip />
        {/* кот идёт по сугробу: лапы стоят на кромке снега, слой выше сугроба */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[46%] z-10 h-36 overflow-x-clip sm:h-44">
          <motion.div style={{ left: catX }} className="absolute bottom-0 w-28 -translate-x-1/2 sm:w-36">
            <Mascot pose="walk" className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
