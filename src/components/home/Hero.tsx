"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ListChecks } from "lucide-react";
import { useRef } from "react";
import { Garland } from "@/components/decor/Garland";
import { Skyline } from "@/components/decor/Skyline";
import { Snow } from "@/components/decor/Snow";
import { Mascot } from "@/components/brand/Mascot";
import { ButtonLink } from "@/components/ui/primitives";
import { RevealTitle } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const farY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 35]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const ticketY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);

  return (
    <section ref={ref} className="blue-sky relative isolate flex min-h-[100svh] flex-col overflow-hidden text-ink" aria-labelledby="hero-title">
      <Snow className="pointer-events-none absolute inset-0 z-20 size-full opacity-80" density={0.00007} />

      <div className="pointer-events-none absolute inset-x-0 top-[4.75rem] z-10 sm:top-[5.25rem]">
        <Garland bulbs={21} lit swags={3} depth={30} sequence className="mx-auto w-[150%] max-w-none -translate-x-[16.5%] sm:w-full sm:translate-x-0" />
      </div>

      <div className="shell relative z-10 grid flex-1 items-center gap-10 pb-[calc(30vh+7rem)] pt-48 sm:pb-[36vh] sm:pt-56 lg:grid-cols-12">
        <motion.div style={{ y: textY }} className="lg:col-span-8">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="text-xl font-bold sm:text-2xl"
          >
            Чёрная пятница для яркого Нового года
          </motion.p>

          <RevealTitle
            as="h1"
            id="hero-title"
            animateOnMount
            delay={0.3}
            lines={["Едем в Москву", "на праздники"]}
            className="display mt-6 text-[clamp(2.05rem,6vw,5.4rem)]"
          />

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.75 }}
            className="mt-7 max-w-xl text-2xl font-medium leading-[1.3]"
          >
            Что посмотреть, куда сходить и какие билеты купить со скидкой
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="#podborka" variant="white" icon={<ArrowDown className="size-5" strokeWidth={2.4} />}>
              Смотреть подборку
            </ButtonLink>
            <ButtonLink href="#chek-list" variant="outline-ink" icon={<ListChecks className="size-5" />}>
              Открыть чек-лист
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* Кот в новогодней шапке, главный герой первого экрана */}
        <motion.div style={{ y: ticketY }} className="hidden lg:col-span-4 lg:block">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 50, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.3, ease, delay: 0.6 }}
            className="relative ml-auto mt-32 w-[25rem] max-w-full"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mascot pose="lie-hat" priority className="w-full drop-shadow-[0_30px_30px_rgb(10_40_90/0.35)]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <Mascot pose="lie-hat" className="pointer-events-none absolute bottom-[max(calc(30vh-0.6rem),12.5rem)] left-1/2 z-10 w-40 -translate-x-[10%] sm:hidden" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[30vh] min-h-[210px] sm:h-[44vh]">
        <motion.div
          className="size-full"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease, delay: 0.1 }}
        >
          <Skyline className="size-full" farY={farY} midY={midY} palette="blue" />
        </motion.div>
      </div>
    </section>
  );
}
