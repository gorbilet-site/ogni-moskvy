import { SINGLE, site } from "@/lib/site";
import { byCategory } from "@/data/offers";
import { TicketWide } from "@/components/offers/Ticket";
import { FadeIn, RevealTitle } from "@/components/ui/Reveal";
import { ButtonLink, Kicker } from "@/components/ui/primitives";

const spans = ["lg:col-span-12", "lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function Guests() {
  const list = byCategory("guests");
  return (
    <section id="podborka" className="relative bg-paper pb-40 pt-24 sm:pb-48 sm:pt-32" aria-labelledby="guests-title">
      <span id="gosti" className="absolute -top-24" aria-hidden />
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Kicker>Куда вести гостей</Kicker>
            <RevealTitle
              id="guests-title"
              lines={["Показываем гостям", "новогоднюю Москву"]}
              className="display mt-5 text-[clamp(1.45rem,3.4vw,3rem)] text-ink"
            />
          </div>
          {SINGLE ? (
            <ButtonLink href={site.gorbiletMoscow} external variant="outline" className="self-start md:self-auto">
              Вся афиша Москвы
            </ButtonLink>
          ) : (
            <ButtonLink href="/afisha" variant="outline" className="self-start md:self-auto">
              Все предложения
            </ButtonLink>
          )}
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {list.map((o, i) => (
            <FadeIn key={o.slug} className={spans[i] ?? "lg:col-span-6"} delay={(i % 2) * 0.08}>
              <TicketWide offer={o} featured={i === 0} notch="bg-paper" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
