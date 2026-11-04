import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { Garland } from "@/components/decor/Garland";
import { Mascot, type Pose } from "@/components/brand/Mascot";
import { RevealTitle } from "@/components/ui/Reveal";
import { cn } from "@/components/ui/primitives";

export function PageHero({
  title,
  lead,
  back,
  children,
  mascot,
}: {
  title: string[];
  lead?: string;
  back?: { href: string; label: string };
  children?: ReactNode;
  mascot?: Pose;
}) {
  return (
    <section className="blue-sky relative isolate overflow-hidden pb-16 pt-40 text-ink sm:pb-24 sm:pt-52">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[4.75rem] sm:top-[5.25rem]">
        <Garland bulbs={15} lit swags={3} depth={22} className="w-full" />
      </div>
      <div className={cn("shell relative", mascot && "lg:pr-80")}>
        {back && (
          <Link href={back.href} className="mb-8 inline-flex min-h-11 items-center gap-1.5 text-[1.1875rem] font-bold text-ink transition-opacity hover:opacity-70">
            <ChevronLeft className="size-5" aria-hidden />
            {back.label}
          </Link>
        )}
        <RevealTitle as="h1" animateOnMount lines={title} className="display max-w-5xl text-[clamp(1.75rem,5.6vw,4.8rem)]" />
        {lead && <p className="mt-8 max-w-2xl text-2xl leading-[1.3]">{lead}</p>}
        {children}
      </div>
      {mascot && (
        <Mascot pose={mascot} className="pointer-events-none absolute bottom-0 right-[6%] hidden w-56 drop-shadow-[0_20px_30px_rgb(10_40_90/0.35)] lg:block" />
      )}
    </section>
  );
}
