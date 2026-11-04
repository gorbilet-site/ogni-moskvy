import { ArrowUpRight } from "lucide-react";
import { OfferLink } from "@/components/offers/Ticket";
import { byCategory } from "@/data/offers";
import { withUtm } from "@/lib/site";
import { FadeIn, RevealTitle } from "@/components/ui/Reveal";

export function Adults() {
  const list = byCategory("adults");
  return (
    <section id="spektakli" className="on-dark relative overflow-hidden bg-ink py-24 text-white sm:py-32" aria-labelledby="adults-title">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(60%_80%_at_50%_0%,rgb(59_139_235/0.22),transparent_70%)]" />
      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealTitle
            id="adults-title"
            lines={["Пока дети на ёлке,", "время для взрослых"]}
            className="display text-[clamp(1.45rem,3.4vw,3rem)] text-white lg:col-span-8"
          />
          <FadeIn className="lg:col-span-3 lg:col-start-10">
            <p className="text-lg leading-[1.45] text-white/70">Комедии со звёздами, пластический спектакль и вечер с Ефимом Шифриным.</p>
          </FadeIn>
        </div>

        <ul className="mt-14 border-t border-white/12">
          {list.map((o, i) => (
            <li key={o.slug}>
              <FadeIn delay={i * 0.05} className="group relative grid gap-4 border-b border-white/12 py-7 sm:grid-cols-12 sm:items-center sm:gap-6 sm:py-9">
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-blue/25 via-blue/5 to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                />
                <div className="relative sm:col-span-6">
                  <p className="text-[0.95rem] font-medium text-white/60">{o.kind}</p>
                  <h3 className="display mt-3 text-[1.3rem] leading-[1.15] text-white transition-transform duration-700 ease-out-expo group-hover:translate-x-2 sm:text-[2rem]">
                    <OfferLink offer={o} className="after:absolute after:inset-0 after:content-['']">
                      {o.title}
                    </OfferLink>
                  </h3>
                </div>
                <p className="relative text-lg text-white/70 sm:col-span-3">{o.accent}</p>
                <div className="relative z-10 flex items-center justify-between gap-4 sm:col-span-3 sm:justify-end">
                  {o.discount && <span className="display text-3xl text-blue tabular-nums">-{o.discount}%</span>}
                  <a
                    href={withUtm(o.url, o.slug)}
                    target="_blank"
                    rel="noopener"
                    className="grid size-14 place-items-center rounded-full border-2 border-white/25 text-white transition-all duration-500 ease-out-expo hover:rotate-45 hover:border-blue hover:bg-blue"
                    aria-label={`Купить билет на «${o.title}» на Горбилете, в новой вкладке`}
                  >
                    <ArrowUpRight className="size-5" />
                  </a>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
