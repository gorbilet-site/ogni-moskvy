/**
 * Маскот Горбилета, чёрный мейн-кун. Позы вырезаны из исходного листа
 * с прозрачным фоном, табличка и билет перекрашены в синий #3B8BEB.
 *
 * peek  кот выглядывает из-за синей таблички; на синем фоне табличка
 *       сливается с секцией, и кажется, что кот выглядывает из-за её края.
 */
import { mascotSrc } from "./mascotSrc";

const POSES = {
  sit: { w: 312, h: 475, alt: "Чёрный кот Горбилета сидит" },
  lie: { w: 490, h: 338, alt: "Чёрный кот Горбилета лежит" },
  "lie-hat": { w: 490, h: 331, alt: "Чёрный кот Горбилета в новогодней шапке" },
  walk: { w: 448, h: 451, alt: "Чёрный кот Горбилета идёт" },
  wave: { w: 293, h: 475, alt: "Чёрный кот Горбилета машет лапой" },
  stretch: { w: 399, h: 481, alt: "Чёрный кот Горбилета потягивается" },
  ticket: { w: 309, h: 500, alt: "Чёрный кот Горбилета держит синий билет" },
  back: { w: 329, h: 509, alt: "Чёрный кот Горбилета оглядывается" },
  peek: { w: 406, h: 362, alt: "Чёрный кот Горбилета выглядывает из-за таблички" },
} as const;

export type Pose = keyof typeof POSES;

export function Mascot({
  pose,
  className,
  decorative = true,
  priority = false,
}: {
  pose: Pose;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
}) {
  const p = POSES[pose];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- прозрачный webp, оптимизация не нужна, работает и в статическом экспорте
    <img
      src={mascotSrc(pose)}
      width={p.w}
      height={p.h}
      alt={decorative ? "" : p.alt}
      aria-hidden={decorative || undefined}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      draggable={false}
      className={className}
    />
  );
}
