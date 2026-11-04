import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/ui/Reveal";
import { articles } from "@/data/articles";
import { cn } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Гид по новогодней Москве",
  description: "Маршрут на три дня, как выбрать ёлку для ребёнка и где посмотреть на Москву с высоты зимой. Практичные советы для поездки на каникулы.",
  alternates: { canonical: "/gid" },
};

const tones = {
  gold: "bg-blue text-ink",
  red: "bg-ink text-white on-dark",
  frost: "bg-paper text-ink",
};

export default function GuidePage() {
  return (
    <>
      <PageHero mascot="sit" title={["Гид по новогодней", "Москве"]} lead="Короткие практичные тексты, которые помогут спланировать каникулы и не потратить их на планирование." />
      <section className="bg-white pb-28">
        <ul className="shell grid gap-5 lg:grid-cols-3">
          {articles.map((a, i) => (
            <li key={a.slug} className={cn(i === 0 && "lg:col-span-2 lg:row-span-2")}>
              <FadeIn delay={i * 0.08} className="h-full">
                <Link
                  href={`/gid/${a.slug}`}
                  className={cn(
                    "group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[2rem] p-7 transition-transform duration-700 ease-out-expo hover:-translate-y-1 sm:p-10",
                    tones[a.tone],
                  )}
                >
                  <span className="flex items-center gap-2 text-[1.1875rem] font-bold">
                    <Clock className="size-5" aria-hidden />
                    {a.readingTime} мин чтения
                  </span>
                  <h2 className={cn("display mt-auto", i === 0 ? "text-[clamp(1.6rem,3.4vw,3rem)]" : "text-[1.6rem]")}>{a.title}</h2>
                  <p className="mt-4 max-w-xl text-2xl leading-[1.3] opacity-90">{a.lead}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-[1.1875rem] font-bold">
                    Читать
                    <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </span>
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
