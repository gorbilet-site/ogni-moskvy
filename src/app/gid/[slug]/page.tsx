import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { TicketMini } from "@/components/offers/Ticket";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { ButtonLink } from "@/components/ui/primitives";
import { articles, getArticle } from "@/data/articles";
import { getOffer } from "@/data/offers";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gid/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/gid/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.lead },
  };
}

export default async function ArticlePage({ params }: PageProps<"/gid/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const others = articles.filter((x) => x.slug !== a.slug);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    inLanguage: "ru",
    publisher: { "@type": "Organization", name: site.brand },
    mainEntityOfPage: `${site.url}/gid/${a.slug}`,
  };

  return (
    <>
      <ReadingProgress />
      <PageHero title={[a.title]} lead={a.lead} back={{ href: "/gid", label: "Гид" }}>
        <p className="mt-8 flex items-center gap-2 text-[1.1875rem] font-bold">
          <Clock className="size-5" aria-hidden />
          {a.readingTime} мин чтения
        </p>
      </PageHero>

      <article className="bg-white pb-24">
        <div className="shell">
          <div className="prose-article mx-auto max-w-[42rem]">
            {a.body.map((b, i) => {
              switch (b.type) {
                case "p":
                  return <p key={i}>{b.text}</p>;
                case "h2":
                  return <h2 key={i}>{b.text}</h2>;
                case "list":
                  return (
                    <ul key={i}>
                      {b.items.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  );
                case "offer": {
                  const o = getOffer(b.slug);
                  return o ? (
                    <div key={i} className="my-8">
                      <TicketMini offer={o} />
                    </div>
                  ) : null;
                }
              }
            })}
          </div>

          <div className="mx-auto mt-16 flex max-w-[42rem] flex-col gap-3 rounded-[2rem] bg-paper p-7 ring-1 ring-ink/10 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="display text-[clamp(1.25rem,2.4vw,1.7rem)] text-ink">Все билеты подборки</p>
            <ButtonLink href="/afisha">Открыть афишу</ButtonLink>
          </div>
        </div>

        <div className="shell mt-24">
          <h2 className="display text-[clamp(1.4rem,3vw,2.2rem)] text-ink">Ещё в гиде</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {others.map((x) => (
              <li key={x.slug}>
                <Link href={`/gid/${x.slug}`} className="group flex h-full flex-col rounded-3xl bg-paper p-7 ring-1 ring-ink/10 transition-colors hover:bg-blush">
                  <span className="display text-[1.35rem] leading-[1.2] text-ink">{x.title}</span>
                  <span className="mt-3 leading-relaxed text-ink/60">{x.lead}</span>
                  <ArrowUpRight className="mt-6 size-5 text-blue-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </>
  );
}
