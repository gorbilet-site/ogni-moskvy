/** Маскот Горбилета. Очищенные края шерсти и прозрачный alpha-канал. */
import { mascotSrc } from "./mascotSrc";

const POSES = {
  sit: { w: 650, h: 990, alt: "Чёрный кот Горбилета сидит" },
  lie: { w: 650, h: 449, alt: "Чёрный кот Горбилета лежит" },
  "lie-hat": { w: 1000, h: 676, alt: "Чёрный кот Горбилета в новогодней шапке" },
  walk: { w: 650, h: 672, alt: "Чёрный кот Горбилета идёт" },
  wave: { w: 650, h: 1054, alt: "Чёрный кот Горбилета машет лапой" },
  stretch: { w: 650, h: 784, alt: "Чёрный кот Горбилета потягивается" },
  "stretch-hat": { w: 800, h: 965, alt: "Чёрный кот Горбилета потягивается в новогодней шапке" },
  ticket: { w: 650, h: 1051, alt: "Чёрный кот Горбилета держит синий билет" },
  back: { w: 650, h: 1006, alt: "Чёрный кот Горбилета оглядывается" },
  peek: { w: 650, h: 580, alt: "Чёрный кот Горбилета выглядывает из-за таблички" },
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
