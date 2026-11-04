import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { SINGLE } from "@/lib/site";

export function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/**
 * Next Link для страниц сайта и обычная ссылка для якорей.
 * В одностраничной сборке всегда обычная ссылка: роутеру некуда переходить.
 */
export function AppLink({ href, ...rest }: { href: string } & Omit<ComponentProps<"a">, "href">) {
  if (SINGLE || href.startsWith("#")) return <a href={href} {...rest} />;
  return <Link href={href} {...rest} />;
}

type Variant = "primary" | "white" | "ink" | "outline" | "outline-ink" | "outline-light";

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  icon?: ReactNode;
} & Omit<ComponentProps<"a">, "href">;

/* Кнопки набраны крупным жирным Inter (19px bold). Текст на синем чёрный */
const base =
  "group relative inline-flex min-h-13 max-w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-5 py-3 text-base font-bold leading-[1.25] transition-[transform,background-color,color,box-shadow,border-color] duration-500 ease-out-expo active:scale-[0.97] sm:min-h-14 sm:px-7 sm:text-[1.1875rem]";

const styles: Record<Variant, string> = {
  primary: "bg-blue text-ink hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgb(59_139_235/0.7)]",
  white: "bg-white text-ink hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgb(17_19_24/0.45)]",
  ink: "bg-ink text-white hover:-translate-y-0.5 hover:bg-ink-2",
  outline: "border-2 border-ink/15 text-ink hover:border-ink",
  "outline-ink": "border-2 border-ink/40 text-ink hover:border-ink hover:bg-white/15",
  "outline-light": "border-2 border-white/45 text-white hover:border-white hover:bg-white/10",
};

/** Кнопка-ссылка с бликом и сдвигом иконки на hover */
export function ButtonLink({ href, children, variant = "primary", external, className, icon, ...rest }: BtnProps) {
  const content = (
    <>
      {(variant === "primary" || variant === "white") && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] blur-md group-hover:animate-shine",
            variant === "primary" ? "bg-white/45" : "bg-blue/20",
          )}
        />
      )}
      <span className="relative min-w-0">{children}</span>
      <span className="relative shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {icon ?? <ArrowUpRight className="size-5" strokeWidth={2.4} />}
      </span>
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cn(base, styles[variant], className)} {...rest}>
        {content}
        <span className="sr-only"> (откроется в новой вкладке)</span>
      </a>
    );
  }
  return (
    <AppLink href={href} className={cn(base, styles[variant], className)}>
      {content}
    </AppLink>
  );
}

export function Kicker({ children, className, tone = "light" }: { children: ReactNode; className?: string; tone?: "light" | "blue" | "dark" }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-base font-semibold",
        tone === "light" ? "text-blue-deep" : tone === "blue" ? "text-ink" : "text-blue",
        className,
      )}
    >
      <span aria-hidden className="h-0.5 w-8 rounded-full bg-current" />
      {children}
    </p>
  );
}
