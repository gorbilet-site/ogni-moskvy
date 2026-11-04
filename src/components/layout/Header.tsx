"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SINGLE, nav, site } from "@/lib/site";
import { LogoFull } from "@/components/brand/Logo";
import { AppLink, cn } from "@/components/ui/primitives";

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => !href.startsWith("/#") && pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 rounded-full bg-white pl-5 pr-2 transition-shadow duration-500 sm:pl-6",
            scrolled || open ? "shadow-[0_12px_40px_-16px_rgb(17_19_24/0.35)]" : "shadow-[0_1px_0_rgb(17_19_24/0.04)]",
          )}
        >
          <AppLink href={SINGLE ? "#main" : "/"} className="group flex items-center gap-4" aria-label={`${site.name} от Горбилета, на главную`}>
            {/* Охранное поле логотипа X/3 обеспечено отступом до подписи */}
            <LogoFull className="h-[1.35rem] w-auto text-ink sm:h-6" title="Горбилет" />
            <span aria-hidden className="hidden h-6 w-px bg-ink/15 sm:block" />
            <span className="hidden text-[0.95rem] font-semibold text-ink sm:block">{site.name}</span>
          </AppLink>

          <nav aria-label="Основная навигация" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <AppLink
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors duration-300",
                      isActive(n.href) ? "text-blue-deep" : "text-ink/70 hover:text-ink",
                    )}
                  >
                    {isActive(n.href) && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-blush" transition={{ duration: 0.5, ease }} />
                    )}
                    {n.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.gorbiletMoscow}
              target="_blank"
              rel="noopener"
              className="hidden min-h-12 items-center gap-2 rounded-full bg-blue px-5 text-[1.1875rem] font-bold text-ink transition-shadow duration-500 hover:shadow-[0_10px_30px_-8px_rgb(59_139_235/0.7)] sm:inline-flex"
            >
              Все билеты
              <ArrowUpRight className="size-5" strokeWidth={2.4} />
              <span className="sr-only"> на Горбилете (откроется в новой вкладке)</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="grid size-12 place-items-center rounded-full bg-blush text-ink transition-colors hover:bg-blue xl:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "m"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="blue-sky fixed inset-0 z-40 flex flex-col overflow-y-auto px-6 pb-10 pt-28 xl:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease }}
          >
            <nav aria-label="Мобильная навигация">
              <ul className="grid">
                {nav.map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease }}
                  >
                    <AppLink
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-center justify-between border-b border-ink/20 py-4 text-[1.6rem] text-ink sm:text-4xl"
                    >
                      {n.label}
                      <ArrowUpRight className="size-6 text-ink/60" aria-hidden />
                    </AppLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.a
              href={site.gorbiletMoscow}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-10 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white text-[1.1875rem] font-bold text-ink"
            >
              Все билеты Москвы на Горбилете
              <ArrowUpRight className="size-5" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
