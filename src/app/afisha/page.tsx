import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { AfishaBrowser, AfishaGrid } from "@/components/offers/AfishaBrowser";
import { offers } from "@/data/offers";

export const metadata: Metadata = {
  title: "Все билеты со скидкой на новогодние праздники в Москве",
  description: `${offers.length} предложений со скидками. Экскурсии и смотровые площадки, новогодние ёлки для детей, спектакли для взрослых и семейные музеи Москвы.`,
  alternates: { canonical: "/afisha" },
};

export default function AfishaPage() {
  return (
    <>
      <PageHero
        mascot="walk"
        title={["Все билеты", "новогодней Москвы"]}
        lead="Экскурсии, смотровые площадки, ёлки, спектакли и музеи. Цены и свободные даты всегда актуальны на странице билета на Горбилете."
      />
      <section className="bg-white pb-28">
        <div className="shell">
          <Suspense fallback={<AfishaGrid filter="all" />}>
            <AfishaBrowser />
          </Suspense>
        </div>
      </section>
    </>
  );
}
