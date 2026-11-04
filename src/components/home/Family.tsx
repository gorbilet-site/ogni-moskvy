import { byCategory } from "@/data/offers";
import {
  BuyLink,
  OfferLink,
  OfferPhoto,
  PriceBlock,
} from "@/components/offers/Ticket";
import { FadeIn, RevealTitle } from "@/components/ui/Reveal";
import { Kicker, cn } from "@/components/ui/primitives";

export function Family() {
  const list = byCategory("family");
  return (
    <section
      id="vmeste"
      className="relative bg-white py-24 sm:py-32"
      aria-labelledby="family-title"
    >
      <div className="shell">
        <Kicker>Интересно взрослым и детям</Kicker>
        <RevealTitle
          id="family-title"
          lines={["Когда хочется", "развлечься всем вместе"]}
          className="display mt-5 text-[clamp(1.45rem,3.4vw,3rem)] text-ink"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {list.map((o, i) => {
            const red = i % 2 === 0;
            return (
              <FadeIn
                key={o.slug}
                delay={i * 0.1}
                className={cn(i === 1 && "md:mt-20")}
              >
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[2rem]",
                    red ? "bg-blue text-ink" : "on-dark bg-ink text-white",
                  )}
                >
                  <OfferPhoto
                    offer={o}
                    className="aspect-[16/9] shrink-0"
                    tint={red ? "bg-blush" : "bg-ink-2"}
                  />
                  <div className="flex flex-1 flex-col p-7 sm:p-10">
                    <p className="text-[1.1875rem] font-bold">{o.kind}</p>
                    <h3 className="display mt-4 text-[clamp(1.6rem,3vw,2.6rem)]">
                      <OfferLink
                        offer={o}
                        className="underline-offset-8 hover:underline"
                      >
                        {o.title}
                      </OfferLink>
                    </h3>
                    <p className="mt-4 max-w-sm text-2xl leading-[1.3]">
                      {o.accent}
                    </p>
                    <ul className="mb-8 mt-6 flex flex-wrap gap-2">
                      {o.facts
                        .filter((f) => !f.startsWith("Скидка"))
                        .map((f) => (
                          <li
                            key={f}
                            className="rounded-full bg-white/20 px-3.5 py-1.5 text-[1.1875rem] font-bold"
                          >
                            {f}
                          </li>
                        ))}
                    </ul>
                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-dashed border-current/35 pt-6">
                      <PriceBlock offer={o} tone={red ? "blue" : "dark"} />
                      <BuyLink offer={o} tone={red ? "blue" : "dark"} />
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
