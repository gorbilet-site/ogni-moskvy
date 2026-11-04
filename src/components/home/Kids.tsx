"use client";

import { links } from "@/lib/site";
import { byCategory } from "@/data/offers";
import { TicketTall } from "@/components/offers/Ticket";
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

  return (
    <section id="yolki" className="relative" aria-labelledby="kids-title">
      <div className="bg-blue">
        <Drift />
      </div>
      <div className="bg-white pb-20 pt-10 text-ink sm:pb-36 sm:pt-16">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <RevealTitle
              id="kids-title"
              lines={["Пока дети ждут", "Деда Мороза,", "выбираем ёлку"]}
              className="display text-[clamp(1.45rem,3.4vw,3rem)] text-ink lg:col-span-7"
            />
            <FadeIn className="lg:col-span-4 lg:col-start-9">
              <p className="text-lg leading-[1.45] text-ink/75">
                Цирк, сказка, любимые герои или шоу с научными опытами. Перед покупкой проверьте возраст и время сеанса на странице билета.
              </p>
              {links.yolkaGuide && (
                <ButtonLink href={links.yolkaGuide} variant="ink" className="mt-6">
                  Как выбрать ёлку
                </ButtonLink>
              )}
            </FadeIn>
          </div>
        </div>

        <ul className="shell mt-8 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {list.map((o, i) => (
            <li key={o.slug} className="min-w-0">
              <FadeIn delay={i * 0.07} className="h-full">
                <TicketTall offer={o} />
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative bg-ink">
        <Drift flip />
      </div>
    </section>
  );
}
