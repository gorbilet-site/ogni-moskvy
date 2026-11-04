"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, type PointerEvent, type ReactNode } from "react";
import { discountOf, type Offer } from "@/data/offers";
import { SINGLE, formatRub, withUtm } from "@/lib/site";
import { cn } from "@/components/ui/primitives";
import { LogoSign } from "@/components/brand/Logo";
import { OfferIcon } from "./OfferIcon";

/** Ссылка на страницу события. В одностраничной сборке ведёт сразу на билет */
export function OfferLink({ offer, className, children }: { offer: Offer; className?: string; children: ReactNode }) {
  if (SINGLE) {
    return (
      <a href={withUtm(offer.url, offer.campaign)} target="_blank" rel="noopener" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/afisha/${offer.slug}`} className={className}>
      {children}
    </Link>
  );
}

function trackSpot(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Локальное фото события; в автономном HTML изображение встроено в файл. */
export function OfferPhoto({ offer, className, tint = "bg-blush" }: { offer: Offer; className?: string; tint?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={cn("relative overflow-hidden", tint, className)}>
      <span aria-hidden className="absolute inset-0 grid place-items-center">
        <span className="grid size-20 place-items-center rounded-full bg-white text-blue-deep">
          <OfferIcon name={offer.icon} className="size-9" />
        </span>
      </span>
      {offer.photo && !failed && (
        // eslint-disable-next-line @next/next/no-img-element -- локальный WebP, совместимый с автономным HTML
        <img
          src={offer.photo}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
      )}
    </div>
  );
}

/**
 * Ценник по образцу из брендбука: «-30%», «от 840 ₽», зачёркнутое «1200 ₽».
 * tone="blue" для синего фона, "light" для белого, "dark" для чёрного.
 */
export function PriceBlock({ offer, tone = "blue" }: { offer: Offer; tone?: "blue" | "light" | "dark" }) {
  const d = discountOf(offer);
  const onBlue = tone === "blue";
  const onDark = tone === "dark";
  if (!offer.price && !d) {
    return (
      <div>
        <LogoSign className="h-9 w-auto text-ink" />
        <p className="mt-3 text-[1.1875rem] font-bold leading-[1.2] text-ink">Цены и даты на&nbsp;странице билета</p>
      </div>
    );
  }
  return (
    <div className="grid gap-1.5">
      {d ? <p className={cn("display text-[2.1rem] leading-none tabular-nums sm:text-[2.6rem]", onBlue ? "text-ink" : "text-blue")}>-{d}%</p> : null}
      {offer.price && (
        <p className={cn("flex flex-wrap items-baseline gap-x-2", onDark ? "text-white" : "text-ink")}>
          <span className="text-[1.1875rem] font-bold tabular-nums">от&nbsp;{formatRub(offer.price.now)}</span>
          <span className={cn("text-base font-medium tabular-nums line-through", onBlue ? "text-ink/70 decoration-ink/60" : onDark ? "text-white/60 decoration-blue" : "text-ink/50 decoration-blue")}>
            <span className="sr-only">вместо </span>
            {formatRub(offer.price.was)}
          </span>
        </p>
      )}
    </div>
  );
}

export function BuyLink({ offer, className, tone = "blue" }: { offer: Offer; className?: string; tone?: "blue" | "light" | "dark" }) {
  return (
    <a
      href={withUtm(offer.url, offer.campaign)}
      target="_blank"
      rel="noopener"
      className={cn(
        "group/buy inline-flex min-h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-base font-bold transition-[background-color,color,box-shadow] duration-300 sm:px-5 sm:text-[1.1875rem]",
        tone === "blue" && "bg-ink text-white hover:shadow-[0_10px_30px_-10px_rgb(17_19_24/0.6)]",
        tone === "light" && "bg-blue text-ink hover:shadow-[0_10px_30px_-10px_rgb(59_139_235/0.7)]",
        tone === "dark" && "bg-blue text-ink hover:bg-white",
        className,
      )}
    >
      Купить
      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover/buy:translate-x-0.5 group-hover/buy:-translate-y-0.5" strokeWidth={2.4} />
      <span className="sr-only"> билет на «{offer.title}» на сайте Горбилета, в новой вкладке</span>
    </a>
  );
}

/** Билет с синим корешком. На мобильных корешок уходит вниз */
export function TicketWide({ offer, featured = false, notch = "bg-paper" }: { offer: Offer; featured?: boolean; notch?: string }) {
  return (
    <article
      onPointerMove={trackSpot}
      className={cn("group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_1px_0_rgb(17_19_24/0.05),0_24px_60px_-40px_rgb(17_19_24/0.45)] transition-[box-shadow,transform] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-[0_34px_80px_-36px_rgb(59_139_235/0.55)]", featured && "xl:flex-row")}
    >
      <OfferPhoto offer={offer} className={cn("aspect-[16/10] shrink-0 sm:aspect-auto sm:h-64", featured && "sm:h-80 xl:h-auto xl:min-h-[26rem] xl:w-[40%]")} />
      <div className="flex min-w-0 flex-1 flex-col sm:flex-row">
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className={cn("relative flex min-w-0 flex-1 flex-col p-5 sm:p-7", featured && "lg:p-8")}>
        <div className="flex items-center gap-3 text-[0.95rem] font-medium text-mute">
          <span className="grid size-10 place-items-center rounded-full bg-blush text-blue-deep">
            <OfferIcon name={offer.icon} className="size-5" />
          </span>
          {offer.kind}
        </div>
        <h3 className={cn("mt-4 font-bold leading-[1.2] text-ink sm:mt-5", featured ? "display text-[1.2rem] sm:text-[1.85rem]" : "text-[1.35rem] sm:text-[1.65rem]")}>
          <OfferLink offer={offer} className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-blue-deep">
            {offer.title}
          </OfferLink>
        </h3>
        <p className="mt-4 max-w-md text-lg leading-[1.4] text-ink/75">{offer.accent}</p>
        {featured && <p className="mt-4 max-w-lg leading-[1.5] text-ink/60">{offer.summary}</p>}
        <ul className="mt-auto flex flex-wrap gap-2 pt-8">
          {offer.facts
            .filter((f) => !f.startsWith("Скидка"))
            .map((f) => (
              <li key={f} className="rounded-full bg-paper px-3 py-1.5 text-sm font-medium text-ink/75">
                {f}
              </li>
            ))}
        </ul>
      </div>

      {/* корешок билета */}
      <div className="relative z-10 flex shrink-0 flex-col bg-blue text-ink sm:w-48">
        <span aria-hidden className={cn("absolute -left-3 -top-3 size-6 rounded-full", notch)} />
        <span aria-hidden className={cn("absolute -right-3 -top-3 size-6 rounded-full sm:-bottom-3 sm:-left-3 sm:right-auto sm:top-auto", notch)} />
        <span aria-hidden className="perforation-x absolute inset-x-5 top-0 h-0.5 text-ink/40 sm:hidden" />
        <span aria-hidden className="perforation-y absolute inset-y-5 left-0 hidden w-0.5 text-ink/40 sm:block" />
        <div className="flex flex-1 flex-wrap items-end justify-between gap-4 p-5 sm:flex-col sm:items-start sm:p-7">
          <PriceBlock offer={offer} />
          <BuyLink offer={offer} className="w-full sm:w-auto" />
        </div>
      </div>
      </div>
    </article>
  );
}

/** Вертикальный билет с фото события для секции с ёлками */
export function TicketTall({ offer }: { offer: Offer }) {
  const d = discountOf(offer);
  return (
    <article
      onPointerMove={trackSpot}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white text-ink ring-1 ring-ink/8 transition-[transform,box-shadow] duration-700 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-40px_rgb(17_19_24/0.5)]"
    >
      <div className="relative">
        <OfferPhoto offer={offer} className="aspect-[16/10] sm:aspect-[5/4]" />
        {d ? (
          <span className="display absolute right-4 top-4 rounded-full bg-blue px-3.5 py-2 text-[1.35rem] leading-none text-ink tabular-nums shadow-[0_8px_20px_-8px_rgb(17_19_24/0.5)]">
            -{d}%
          </span>
        ) : null}
      </div>
      <div aria-hidden className="relative h-6">
        <span className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-white ring-1 ring-ink/8" />
        <span className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-white ring-1 ring-ink/8" />
        <span className="perforation-x absolute inset-x-5 top-1/2 h-0.5 -translate-y-1/2 text-ink/20" />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
        <p className="text-[0.95rem] font-medium text-mute">{offer.kind}</p>
        <h3 className="mt-2 text-[1.45rem] font-bold leading-[1.15] text-ink">
          <OfferLink offer={offer} className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-blue-deep">
            {offer.title}
          </OfferLink>
        </h3>
        <p className="mt-3 leading-[1.45] text-ink/70">{offer.accent}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-6">
          {offer.price ? (
            <p className="flex flex-col">
              <span className="text-[1.1875rem] font-bold tabular-nums">от&nbsp;{formatRub(offer.price.now)}</span>
              <span className="text-sm font-medium tabular-nums text-ink/50 line-through decoration-blue">
                <span className="sr-only">вместо </span>
                {formatRub(offer.price.was)}
              </span>
            </p>
          ) : (
            <span />
          )}
          <BuyLink offer={offer} tone="light" className="relative z-10" />
        </div>
      </div>
    </article>
  );
}

/** Компактный билет для статей, навигатора и маршрута */
export function TicketMini({ offer }: { offer: Offer }) {
  const d = discountOf(offer);
  return (
    <article className="group relative flex items-start gap-3 overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-ink/10 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-24px_rgb(17_19_24/0.45)] sm:items-center sm:gap-5 sm:p-5">
      <OfferPhoto offer={offer} className="size-12 shrink-0 rounded-xl sm:size-20" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-mute">{offer.kind}</p>
        <h3 className="mt-0.5 font-bold leading-[1.2] text-ink">
          <OfferLink offer={offer} className="after:absolute after:inset-0 after:content-['']">
            {offer.title}
          </OfferLink>
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-0.5">
          {offer.price && <p className="text-sm font-semibold tabular-nums text-ink/70">от&nbsp;{formatRub(offer.price.now)}</p>}
          {d ? <span className="rounded-full bg-blush px-2 py-0.5 text-xs font-bold text-blue-deep sm:hidden">-{d}%</span> : null}
        </div>
      </div>
      {d ? (
        <span className="display hidden shrink-0 rounded-full bg-blue px-3 py-1.5 text-base leading-none text-ink tabular-nums sm:block">-{d}%</span>
      ) : (
        <ArrowUpRight className="hidden size-5 shrink-0 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" aria-hidden />
      )}
    </article>
  );
}
