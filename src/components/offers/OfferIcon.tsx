import {
  BookOpen,
  Bus,
  Cat,
  CloudRain,
  Drama,
  Hammer,
  Heart,
  Landmark,
  Mic,
  Rocket,
  Sparkles,
  Tent,
  TrainFront,
  Trophy,
  WandSparkles,
  type LucideProps,
} from "lucide-react";
import type { IconKey } from "@/data/offers";

const map = {
  bus: Bus,
  landmark: Landmark,
  train: TrainFront,
  heart: Heart,
  sparkles: Sparkles,
  tent: Tent,
  book: BookOpen,
  cat: Cat,
  rocket: Rocket,
  drama: Drama,
  hammer: Hammer,
  rain: CloudRain,
  mic: Mic,
  trophy: Trophy,
  wand: WandSparkles,
} satisfies Record<IconKey, unknown>;

export function OfferIcon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Icon = map[name];
  return <Icon strokeWidth={1.5} aria-hidden {...props} />;
}
