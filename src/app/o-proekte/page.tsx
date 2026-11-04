import type { Metadata } from "next";
import { BadgePercent, Ticket, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Faq } from "@/components/ui/Faq";
import { FadeIn, RevealTitle } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/primitives";
import { offers } from "@/data/offers";
import { contacts } from "@/lib/site";
import { plural } from "@/lib/plural";

export const metadata: Metadata = {
  title: "О проекте",
  description: "«Огни Москвы» это новогодняя подборка Горбилета к Чёрной пятнице. Как мы выбирали события, откуда цены и как купить билет.",
  alternates: { canonical: "/o-proekte" },
};

const principles = [
  {
    icon: Ticket,
    title: "Только то, что можно купить",
    text: "В подборке нет абстрактных советов вроде «сходите куда-нибудь». За каждым пунктом стоит реальный билет на Горбилете, который можно оформить за пару минут.",
  },
  {
    icon: Users,
    title: "Подборка под ситуацию",
    text: "Мы разделили события по тому, с кем вы едете. Гостям показать город, детям устроить ёлку, взрослым выбраться на спектакль, а всем вместе провести день в музее.",
  },
  {
    icon: BadgePercent,
    title: "Честно о ценах",
    text: "Скидки на сайте взяты со страниц билетов. Цена и наличие мест меняются, поэтому финальную сумму вы всегда видите на Горбилете до оплаты.",
  },
];

export default function AboutPage() {
  const n = offers.length;
  return (
    <>
      <PageHero
        mascot="back"
        title={["Новогодняя Москва", "без долгого планирования"]}
        lead={`«Огни Москвы» это сайт-путеводитель Горбилета к Чёрной пятнице. Мы собрали ${n} ${plural(n, ["событие", "события", "событий"])} со скидками, чек-лист и готовый маршрут на три дня, чтобы на каникулах оставалось только гулять.`}
      />

      <section className="bg-white pb-24 sm:pb-32">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <RevealTitle lines={["Как мы", "собирали подборку"]} className="display text-[clamp(1.5rem,3.2vw,2.6rem)] text-ink lg:sticky lg:top-28" />
          </div>
          <ul className="grid gap-12 lg:col-span-7 lg:col-start-6">
            {principles.map((p, i) => (
              <li key={p.title}>
                <FadeIn delay={i * 0.08} className="grid gap-4 border-t border-ink/12 pt-8 sm:grid-cols-[5rem_1fr]">
                  <span className="grid size-14 place-items-center rounded-full bg-blush text-blue-deep ring-1 ring-blue/20">
                    <p.icon className="size-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold text-ink">{p.title}</h2>
                    <p className="mt-3 text-lg leading-relaxed text-ink/70">{p.text}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <RevealTitle lines={["Частые", "вопросы"]} className="display text-[clamp(1.5rem,3.2vw,2.6rem)] text-ink" />
          </div>
          <div className="lg:col-span-8">
            <Faq
              items={[
                {
                  q: "Где покупается билет?",
                  a: "На сайте Горбилета. Кнопка «Купить билет» откроет страницу события, где можно выбрать дату, количество мест и оплатить.",
                },
                {
                  q: "Скидка действует на все даты?",
                  a: "Условия зависят от события. Актуальная скидка и цена указаны на странице билета, они приоритетнее информации на этом сайте.",
                },
                {
                  q: "Как вернуть билет или получить его повторно?",
                  a: (
                    <>
                      Это можно сделать в сервисе{" "}
                      <a href={contacts.tickets} target="_blank" rel="noopener" className="text-blue-deep underline underline-offset-4">
                        tickets.gorbilet.ru
                      </a>
                      . Если что-то не получается, напишите в поддержку, контакты есть на странице «Контакты».
                    </>
                  ),
                },
                {
                  q: "Сохранится ли мой чек-лист?",
                  a: "Да, отметки хранятся в вашем браузере на этом устройстве. Мы их не собираем. Чтобы перенести список на другое устройство, нажмите «Поделиться».",
                },
              ]}
            />
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/afisha">Смотреть билеты</ButtonLink>
              <ButtonLink href="/kontakty" variant="outline">
                Связаться с нами
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
