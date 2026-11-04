import { Ticket } from "lucide-react";
import { Garland } from "@/components/decor/Garland";
import { Skyline } from "@/components/decor/Skyline";
import { Mascot } from "@/components/brand/Mascot";
import { FadeIn, RevealTitle } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/primitives";
import { links, site } from "@/lib/site";

export function Finale() {
  return (
    <section className="blue-sky relative isolate overflow-hidden pt-16 text-ink" aria-labelledby="finale-title">
      <Garland bulbs={17} lit swags={2} depth={40} className="mx-auto w-full max-w-6xl px-5" />
      <div className="shell relative z-10 grid gap-10 pb-[22rem] pt-14 sm:pb-[27rem] lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RevealTitle id="finale-title" lines={["Новогодняя Москва", "уже ждёт"]} className="display text-[clamp(1.9rem,6.4vw,5.6rem)]" />
          <FadeIn delay={0.2}>
            <p className="mt-8 max-w-xl text-2xl leading-[1.3]">
              Билеты на экскурсии, спектакли, ёлки и развлечения со скидками. Выбирайте впечатления, которые хотите подарить себе и близким на праздниках.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={links.afisha} variant="white" icon={<Ticket className="size-5" />}>
                Собрать свою Москву выгоднее
              </ButtonLink>
              <ButtonLink href={site.gorbiletMoscow} external variant="outline-ink">
                Вся афиша Москвы
              </ButtonLink>
            </div>
          </FadeIn>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-80 sm:h-[26rem]">
        <Skyline className="size-full" palette="ink" />
      </div>
      {/* кот сидит спиной и смотрит на город */}
      <Mascot pose="back" className="pointer-events-none absolute bottom-[2.6rem] left-[14%] z-10 w-20 sm:bottom-[3.4rem] sm:left-[33%] sm:w-28" />
    </section>
  );
}
