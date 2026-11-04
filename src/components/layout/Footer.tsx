import { AppLink } from "@/components/ui/primitives";
import { ArrowUpRight } from "lucide-react";
import { categories, offers } from "@/data/offers";
import { articles } from "@/data/articles";
import { SINGLE, contacts, links, nav, site, withUtm } from "@/lib/site";
import { LogoFull } from "@/components/brand/Logo";

export function Footer() {
  const year = 2026;
  const linkCls = "text-white/80 transition-colors hover:text-blue";
  return (
    <footer className="on-dark relative mt-auto overflow-hidden bg-ink text-white">
      <div className="shell relative grid gap-14 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <AppLink
            href={SINGLE ? "#main" : "/"}
            className="inline-block p-1"
            aria-label="На главную"
          >
            <LogoFull className="h-8 w-auto text-white" title="Горбилет" />
          </AppLink>
          <p className="mt-8 max-w-sm text-lg leading-[1.45] text-white/65">
            {site.name}. Новогодняя Москва со скидками. Подборку собрала команда
            Горбилета, сервиса билетов на экскурсии, спектакли и развлечения.
          </p>
          <a
            href={withUtm(site.gorbiletMoscow)}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 border-b-2 border-blue pb-1 text-lg font-bold text-white transition-colors hover:text-blue"
          >
            Все события Москвы на Горбилете
            <ArrowUpRight className="size-5" />
          </a>
        </div>

        <nav
          aria-label="Разделы"
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-10 md:col-span-7"
        >
          <div>
            <h2 className="text-[0.95rem] font-semibold text-white/50">Сайт</h2>
            <ul className="mt-4 grid gap-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <AppLink href={n.href} className={linkCls}>
                    {n.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[0.95rem] font-semibold text-white/50">
              Подборки
            </h2>
            <ul className="mt-4 grid gap-3">
              {Object.entries(categories).map(([key, c]) => (
                <li key={key}>
                  <AppLink
                    href={links.category(key, c.anchor)}
                    className={linkCls}
                  >
                    {c.short}
                  </AppLink>
                </li>
              ))}
              <li className="text-sm text-white/45">
                {offers.length} предложений
              </li>
            </ul>
          </div>
          {!SINGLE && (
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-[0.95rem] font-semibold text-white/50">
                Гид
              </h2>
              <ul className="mt-4 grid gap-3">
                {articles.map((a) => (
                  <li key={a.slug}>
                    <AppLink href={`/gid/${a.slug}`} className={linkCls}>
                      {a.title}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
      <div className="shell relative flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} ООО «Горбилет»</p>
        <p>
          Вопросы по билетам{" "}
          <a
            href={contacts.telegram}
            target="_blank"
            rel="noopener"
            className="text-white/80 underline-offset-4 hover:underline"
          >
            в Telegram
          </a>{" "}
          и на{"\u00a0"}
          <a
            href={`mailto:${contacts.email}`}
            className="text-white/80 underline-offset-4 hover:underline"
          >
            {contacts.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
