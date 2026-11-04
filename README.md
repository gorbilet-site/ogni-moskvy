# Огни Москвы

GitHub: https://github.com/gorbilet-site/ogni-moskvy

GitHub Pages: https://gorbilet-site.github.io/ogni-moskvy/

Для обновления опубликованного сайта выполните `npm run build:pages`, затем закоммитьте и отправьте изменения вместе с папкой `docs`. GitHub Pages использует `main` → `/docs`.

Общие переходы на московскую афишу размечены `utm_source=vk`, `utm_medium=rassilka_tr`, `utm_campaign=other_msk`, `utm_content=msk` через `site.gorbiletMoscow` в `src/lib/site.ts`.
Для сборки в Windows при ошибке CSS-обработчика Turbopack можно использовать `npm run build:webpack` с переменной `STATIC_EXPORT=1` для статического экспорта.

Сайт-сателлит Горбилета к Чёрной пятнице «Чёрная пятница для яркого Нового года». Лид-магнит про новогоднюю Москву: чек-лист, подборки билетов со скидками, навигатор, маршрут на три дня, гид и страницы каждого события.

Стек Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, Lucide.

Палитра кампании синий #3B8BEB, белый и чёрный, текст чёрный (на синем контраст 5.6:1). Шрифты и набор по брендбуку Горбилета: Inter для текста, Druk Wide для заголовков и цифр, интерлиньяж 120%, выравнивание влево. Логотип чёрный на белом и белый на чёрном. Шрифты лежат в `src/fonts`, логотипы в `src/components/brand/Logo.tsx`, маскот (чёрный мейн-кун) в `public/mascot`.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Статическая сборка для любого хостинга без Node.js

```bash
npm run build:static   # результат в папке out/
```

Один HTML-файл со всем внутри (стили, шрифты, картинки, скрипты), открывается двойным кликом

```bash
npm run build:single   # результат ogni-moskvy.html (scripts/build-single.mjs)
```

В этом режиме сайт одностраничный: меню ведёт к разделам главной, карточки сразу на билеты Горбилета. Страница рендерится React напрямую, без роутера Next.js, поэтому файл открывается и локально, и в превью мессенджеров и почты.

## Что где править

| Что | Файл |
| --- | --- |
| Цены, скидки, фото, описания, ссылки на билеты | `src/data/offers.ts` |
| Чек-лист, навигатор, маршрут на 3 дня | `src/data/guide.ts` |
| Статьи гида | `src/data/articles.ts` |
| Домен, UTM-метки, контакты | `src/lib/site.ts` |
| Цвета и шрифты | `src/app/globals.css` (блок `@theme`) |

### Цены Чёрной пятницы

У каждого предложения есть поле `price`. Пока там `null`, карточка показывает текущую скидку. Впишите `price: { was: 1600, now: 1120 }`, и на карточке появятся «Было», «Стало» и «Экономия», которая посчитается сама.

### UTM

Все кнопки «Купить билет» ведут на Горбилет с метками `utm_source=ogni_moskvy`, `utm_medium=satellite`, `utm_campaign=black_friday_ny_moscow` и `utm_content=<slug события>`. Меняются в `src/lib/site.ts`.

## Страницы

- `/` главная, все 10 блоков ТЗ
- `/afisha` все билеты с фильтром по категориям, `/afisha/[slug]` страница события
- `/gid` и `/gid/[slug]` статьи
- `/o-proekte`, `/kontakty`
- `sitemap.xml`, `robots.txt`, OG-картинка `public/og.jpg`

## Доступность и анимации

Анимации учитывают `prefers-reduced-motion`. Снег останавливается вне экрана и на скрытой вкладке. Навигация с клавиатуры, видимый фокус, ссылка «Перейти к содержанию», ARIA для вкладок и чек-листа.
