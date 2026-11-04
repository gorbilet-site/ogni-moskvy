import { BuyLink, OfferLink, OfferPhoto, PriceBlock } from "@/components/offers/Ticket";
import { byCategory } from "@/data/offers";
import { FadeIn, RevealTitle } from "@/components/ui/Reveal";

export function Adults() {
  const list = byCategory("adults");
  return (
    <section id="spektakli" className="on-dark relative overflow-hidden bg-ink py-16 text-white sm:py-32" aria-labelledby="adults-title">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(60%_80%_at_50%_0%,rgb(59_139_235/0.22),transparent_70%)]" />
      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealTitle id="adults-title" lines={["Пока дети на ёлке,", "время для взрослых"]} className="display text-[clamp(1.45rem,3.4vw,3rem)] text-white lg:col-span-8" />
          <FadeIn className="lg:col-span-3 lg:col-start-10">
            <p className="text-lg leading-[1.45] text-white/70">Комедии со звёздами, пластический спектакль и вечер с Ефимом Шифриным.</p>
          </FadeIn>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-2">
          {list.map((o, i) => (
            <li key={o.slug}>
              <FadeIn delay={(i % 2) * 0.08} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ink-2 ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-1">
                  <OfferPhoto offer={o} className="aspect-[16/10] sm:aspect-[16/9]" tint="bg-ink-2" />
                  <div className="flex flex-1 flex-col p-5 sm:p-8">
                    <p className="text-sm font-medium text-white/60">{o.kind}</p>
                    <h3 className="mt-3 text-[1.35rem] font-bold leading-[1.2] sm:text-[1.9rem]">
                      <OfferLink offer={o} className="after:absolute after:inset-0 after:content-[''] hover:text-blue">{o.title}</OfferLink>
                    </h3>
                    <p className="mt-3 text-lg text-white/70">{o.accent}</p>
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-8">
                      <PriceBlock offer={o} tone="dark" />
                      <BuyLink offer={o} tone="dark" className="relative z-10 w-full sm:w-auto" />
                    </div>
                  </div>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
