export const site = {
  name: "Огни Москвы",
  brand: "Горбилет",
  tagline: "Чёрная пятница для яркого Нового года",
  description:
    "Новогодняя Москва со скидками. Экскурсии, смотровые площадки, ёлки для детей, спектакли для взрослых и готовый маршрут на три дня от Горбилета.",
  // Замените на боевой домен сателлита перед публикацией
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ogni-moskvy.gorbilet.ru",
  gorbiletMoscow: "https://gorbilet.ru/msk/?utm_source=vk&utm_medium=rassilka_tr&utm_campaign=other_msk&utm_content=msk",
  // Чёрная пятница 2026
  blackFriday: "2026-11-27",
  utm: {
    utm_source: "vk",
    utm_medium: "rassilka_tr",
    utm_campaign: "other_msk",
  },
} as const;

export const contacts = {
  email: "info@gorbilet.com",
  telegram: "https://t.me/Gorbilet_podderzka_bot",
  vk: "https://vk.ru/gorbilet_travel",
  max: "https://max.ru/id7813296237_bot",
  tickets: "https://tickets.gorbilet.ru",
} as const;

/**
 * Одностраничная сборка (npm run build:single): сайт собирается в один HTML-файл.
 * Внутренних страниц там нет, поэтому ссылки ведут на якоря главной и на Горбилет.
 */
export const SINGLE = process.env.NEXT_PUBLIC_SINGLE === "1";

const fullNav = [
  { href: "/#podborka", label: "Подборка" },
  { href: "/#chek-list", label: "Чек-лист" },
  { href: "/#marshrut", label: "Маршрут" },
  { href: "/afisha", label: "Все билеты" },
  { href: "/gid", label: "Гид" },
  { href: "/o-proekte", label: "О проекте" },
  { href: "/kontakty", label: "Контакты" },
];

const singleNav = [
  { href: "#podborka", label: "Подборка" },
  { href: "#chek-list", label: "Чек-лист" },
  { href: "#yolki", label: "Ёлки" },
  { href: "#spektakli", label: "Спектакли" },
  { href: "#marshrut", label: "Маршрут" },
];

export const nav = SINGLE ? singleNav : fullNav;

/** Внутренние ссылки, которые в одностраничной сборке заменяются якорями */
export const links = {
  afisha: SINGLE ? "#podborka" : "/afisha",
  route: SINGLE ? "#marshrut" : "/gid/novogodnyaya-moskva-za-tri-dnya",
  yolkaGuide: SINGLE ? null : "/gid/kak-vybrat-novogodnyuyu-yolku",
  category: (key: string, anchor: string) => (SINGLE ? `#${anchor}` : `/afisha?kategoriya=${key}`),
};

export type Campaign = "spektakl_msk" | "avtexcursion_msk" | "mesta_msk";

/** Последний сегмент адреса Горбилета, а не сокращённый slug локальной страницы. */
export function withUtm(url: string, campaign?: Campaign) {
  const u = new URL(url);
  // Сохраняем рабочие параметры страницы, заменяем только атрибуцию рассылки.
  for (const key of [...u.searchParams.keys()]) {
    if (key.startsWith("utm_")) u.searchParams.delete(key);
  }
  Object.entries(site.utm).forEach(([k, v]) => u.searchParams.set(k, v));
  if (campaign) u.searchParams.set("utm_campaign", campaign === "mesta_msk" ? "moscow_newyear_mesta_msk" : campaign);
  const content = u.pathname.split("/").filter(Boolean).at(-1);
  if (content) u.searchParams.set("utm_content", content);
  return u.toString();
}

const rub = new Intl.NumberFormat("ru-RU");
export const formatRub = (n: number) => `${rub.format(n)} ₽`;
