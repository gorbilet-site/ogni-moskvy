import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Checklist } from "@/components/home/Checklist";
import { Guests } from "@/components/home/Guests";
import { Navigator } from "@/components/home/Navigator";
import { Kids } from "@/components/home/Kids";
import { Adults } from "@/components/home/Adults";
import { Family } from "@/components/home/Family";
import { Itinerary } from "@/components/home/Itinerary";
import { Finale } from "@/components/home/Finale";
import { offers } from "@/data/offers";
import { site, withUtm } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Новогодняя Москва со скидками",
    itemListElement: offers.map((o, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: o.title,
      url: withUtm(o.url, o.slug),
    })),
  };
  return (
    <>
      <Hero />
      <Intro />
      <Checklist />
      <Guests />
      <Navigator />
      <Kids />
      <Adults />
      <Family />
      <Itinerary />
      <Finale />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, publisher: { "@type": "Organization", name: site.brand } }).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
