import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Info, Route, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { OfferIcon } from "@/components/offers/OfferIcon";
import { BuyLink, PriceBlock, TicketMini } from "@/components/offers/Ticket";
import { FadeIn } from "@/components/ui/Reveal";
import { categories, getOffer, offers } from "@/data/offers";
import { itinerary, situations } from "@/data/guide";
import { articles } from "@/data/articles";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: PageProps<"/afisha/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const o = getOffer(slug);
  if (!o) return {};
  const disc = o.discount ? ` со скидкой ${o.discount}%` : "";
  return {
    title: `${o.title}${disc}. ${o.kind} в Москве`,
    description: `${o.summary.split(". ")[0]}. Билеты${disc} на новогодние праздники.`,
    alternates: { canonical: `/afisha/${o.slug}` },
    openGraph: { title: o.title, description: o.accent },
  };
}

export default async function OfferPage({ params }: PageProps<"/afisha/[slug]">) {
  const { slug } = await params;
  const o = getOffer(slug);
  if (!o) notFound();

  const day = itinerary.findIndex((d) => d.stops.some((s) => s.offer === o.slug));
  const situation = situations.find((s) => s.offers.includes(o.slug));
  const mentioned = articles.filter((a) => a.body.some((b) => b.type === "offer" && b.slug === o.slug));
  const related = offers.filter((x) => x.category === o.category && x.slug !== o.slug);

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.name, item: site.url },
      { "@type": "ListItem", position: 2, name: "Все билеты", item: `${site.url}/afisha` },
      { "@type": "ListItem", position: 3, name: o.title, item: `${site.url}/afisha/${o.slug}` },
    ],
  };

  return (
    <>
      <PageHero title={[o.title]} lead={o.accent} back={{ href: `/afisha?kategoriya=${o.category}`, label: categories[o.category].short }}>
        <div className="mt-8 flex items-center gap-3 text-[1.1875rem] font-bold">
          <span className="grid size-11 place-items-center rounded-full bg-white text-blue">
            <OfferIcon name={o.icon} className="size-5" />
          </span>
          {o.kind}
        </div>
      </PageHero>

      <section className="bg-white pb-24">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeIn>
              <p className="text-xl leading-relaxed text-ink/85 sm:text-2xl sm:leading-relaxed">{o.summary}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {o.facts.map((f) => (
                  <li key={f} className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink/75">
                    {f}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-paper p-6 ring-1 ring-ink/10">
                <Users className="size-5 text-blue-deep" aria-hidden />
                <h2 className="mt-4 font-semibold text-ink">Кому подойдёт</h2>
                <p className="mt-2 leading-relaxed text-ink/65">{o.forWhom}</p>
              </div>
              {day >= 0 ? (
                <Link href="/#marshrut" className="group rounded-3xl bg-paper p-6 ring-1 ring-ink/10 transition-colors hover:bg-blush">
                  <Route className="size-5 text-blue-deep" aria-hidden />
                  <h2 className="mt-4 font-semibold text-ink">В маршруте на три дня</h2>
                  <p className="mt-2 leading-relaxed text-ink/65">
                    День {day + 1}, «{itinerary[day].title}». {itinerary[day].mood}.
                  </p>
                </Link>
              ) : (
                <div className="rounded-3xl bg-paper p-6 ring-1 ring-ink/10">
                  <CalendarDays className="size-5 text-blue-deep" aria-hidden />
                  <h2 className="mt-4 font-semibold text-ink">Даты и сеансы</h2>
                  <p className="mt-2 leading-relaxed text-ink/65">Расписание на каникулы смотрите на странице билета. Популярные даты лучше брать заранее.</p>
                </div>
              )}
            </div>

            {situation && (
              <p className="mt-8 rounded-3xl border border-dashed border-blue/30 p-6 leading-relaxed text-ink/75">
                <span className="font-semibold text-blue-deep">{situation.label}?</span> {situation.note}
              </p>
            )}

            {mentioned.length > 0 && (
              <div className="mt-14">
                <h2 className="display text-[clamp(1.25rem,2.4vw,1.7rem)] text-ink">Читайте в гиде</h2>
                <ul className="mt-5 grid gap-2">
                  {mentioned.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/gid/${a.slug}`} className="text-lg text-ink/80 underline decoration-blue/50 underline-offset-[6px] transition-colors hover:text-blue-deep">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9" aria-label="Покупка билета">
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-[2rem] bg-blue p-7 text-ink">
                <p className="text-[1.1875rem] font-bold">Билет на Горбилете</p>
                <p className="display mt-3 text-[1.45rem] leading-[1.2]">{o.title}</p>
                <div aria-hidden className="relative -mx-7 my-7 h-6">
                  <span className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-white" />
                  <span className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-white" />
                  <span className="perforation-x absolute inset-x-6 top-1/2 h-0.5 -translate-y-1/2 text-ink/40" />
                </div>
                <PriceBlock offer={o} />
                <BuyLink offer={o} className="mt-7 w-full justify-center" />
                <p className="mt-6 flex gap-2 border-t border-ink/25 pt-5 text-[1.1875rem] font-bold leading-[1.3]">
                  <Info className="mt-1 size-5 shrink-0" aria-hidden />
                  Дату и места выбираете на Горбилете. Там же актуальная цена.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="shell mt-24">
            <h2 className="display text-[clamp(1.4rem,3vw,2.2rem)] text-ink">{categories[o.category].label}</h2>
            <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <TicketMini offer={r} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs).replace(/</g, "\\u003c") }} />
    </>
  );
}
