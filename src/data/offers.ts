/**
 * Предложения подборки. Цены сохранены из исходного задания.
 * Фотографии загружены со страниц Горбилета 30.10.2026 в public/offers.
 * Источники и исходные размеры: docs/photo-sources.json.
 */
import { offerPhotoSrc } from "@/lib/offerPhotoSrc";
import type { Campaign } from "@/lib/site";

export type Category = "guests" | "kids" | "adults" | "family";

export type IconKey =
  | "bus"
  | "landmark"
  | "train"
  | "heart"
  | "sparkles"
  | "tent"
  | "book"
  | "cat"
  | "rocket"
  | "drama"
  | "hammer"
  | "rain"
  | "mic"
  | "trophy"
  | "wand";

export type Offer = {
  slug: string;
  title: string;
  kind: string;
  category: Category;
  campaign: Campaign;
  /** Короткий акцент из ТЗ */
  accent: string;
  /** Описание для страницы предложения, по данным страницы Горбилета */
  summary: string;
  facts: string[];
  forWhom: string;
  url: string;
  discount?: number;
  price: { was: number; now: number } | null;
  photo?: string;
  icon: IconKey;
};

export const categories: Record<Category, { label: string; short: string; anchor: string }> = {
  guests: { label: "Показываем гостям новогоднюю Москву", short: "Экскурсии и виды", anchor: "gosti" },
  kids: { label: "Новогодние ёлки для детей", short: "Ёлки для детей", anchor: "yolki" },
  adults: { label: "Спектакли для взрослых", short: "Спектакли", anchor: "spektakli" },
  family: { label: "Интересно взрослым и детям", short: "Всей семьёй", anchor: "vmeste" },
};

export const offers: Offer[] = [
  {
    slug: "novogodnyaya-moskva",
    title: "Новогодняя Москва",
    kind: "Автобусная экскурсия",
    category: "guests",
    campaign: "avtexcursion_msk",
    accent: "Максимум праздничных локаций за одну экскурсию",
    summary:
      "Большая обзорная поездка по украшенной столице. Красная площадь, Патриаршие пруды, Воробьёвы горы и Москва-Сити из окна тёплого автобуса, а по дороге история города от гида.",
    facts: ["Красная площадь и Патриаршие", "Воробьёвы горы", "Москва-Сити", "Скидка 10%"],
    forWhom: "Тем, кто впервые в Москве и хочет увидеть всё главное за один вечер",
    url: "https://gorbilet.ru/msk/actions/avtobusnaja-ekskursija-novogodnjaja-moskva/",
    discount: 10,
    price: { was: 1900, now: 1710 },
    photo: offerPhotoSrc("novogodnyaya-moskva"),
    icon: "bus",
  },
  {
    slug: "hram-hrista-spasitelya-smotrovye",
    title: "Храм Христа Спасителя + 4 смотровые площадки",
    kind: "Пешеходная экскурсия",
    category: "guests",
    campaign: "avtexcursion_msk",
    accent: "Четыре смотровые площадки и панорамы Москвы",
    summary:
      "Экскурсия по главному собору страны с подъёмом на четыре смотровые площадки примерно в 40 метрах под куполом. С них видно Москва-Сити, Арбат и Замоскворечье. Гид расскажет о росписях, алтаре и истории храма от строительства до восстановления.",
    facts: ["1,5 часа", "Площадки под куполом", "Дети до 5 лет бесплатно", "Скидка 10%"],
    forWhom: "Тем, кто приехал с родителями и ценит спокойный темп",
    url: "https://gorbilet.ru/msk/actions/peshehodnaja-ekskursija-hram-hrista-spasitelja-4-smotrovye-ploschadki/",
    discount: 10,
    price: { was: 1600, now: 1440 },
    photo: offerPhotoSrc("hram-hrista-spasitelya-smotrovye"),
    icon: "landmark",
  },
  {
    slug: "tsar-maket",
    title: "Музей-диорама «Царь-макет»",
    kind: "Музей",
    category: "guests",
    campaign: "mesta_msk",
    accent: "Интересно и взрослым, и детям",
    summary:
      "Интерактивный макет России в масштабе 1:87. Москва, Петербург, Казань, Сочи и природные заповедники в миниатюре, где ездят поезда, машины и живут крошечные жители. Для части залов есть аудиогид.",
    facts: ["Масштаб 1:87", "Движущиеся поезда", "Аудиогид", "Скидка 10%"],
    forWhom: "Семьям с детьми и всем, кто любит рассматривать детали",
    url: "https://gorbilet.ru/msk/actions/muzej-diorama-tsar-maket/",
    discount: 10,
    price: { was: 1000, now: 900 },
    photo: offerPhotoSrc("tsar-maket"),
    icon: "train",
  },
  {
    slug: "vyshe-tolko-lyubov",
    title: "Смотровая площадка «Выше только любовь»",
    kind: "Смотровая площадка",
    category: "guests",
    campaign: "mesta_msk",
    accent: "Москва с высоты и праздничные виды",
    summary:
      "Смотровая площадка на высоте 354 метра над землёй, которую её создатели называют самой высокой в Москве. Город в огнях видно до горизонта, а к билету полагается комплимент.",
    facts: ["354 метра", "Билет с комплиментом", "Скидка 30%"],
    forWhom: "Тем, кто хочет самые красивые фотографии поездки",
    url: "https://gorbilet.ru/msk/actions/poseschenie-smotrovoj-ploschadki-vyshetolkoljubov-s-komplimentom/",
    discount: 30,
    price: { was: 1800, now: 1260 },
    photo: offerPhotoSrc("vyshe-tolko-lyubov"),
    icon: "heart",
  },
  {
    slug: "novogodnyaya-skazka-v-gorode",
    title: "Новогодняя сказка в городе",
    kind: "Пешеходная экскурсия",
    category: "guests",
    campaign: "avtexcursion_msk",
    accent: "Праздничный центр, ГУМ и новогодняя атмосфера",
    summary:
      "Прогулка по праздничному центру Москвы о том, как в городе встречали Новый год в разные эпохи. Огни улиц, иллюминация и выставка «Новогодние ёлки в ГУМе».",
    facts: ["История праздника", "Выставка ёлок в ГУМе", "Скидка 20%"],
    forWhom: "Тем, кто хочет по-настоящему почувствовать Новый год",
    url: "https://gorbilet.ru/msk/actions/peshehodnaja-ekskursija-novogodnjaja-skazka-v-gorode/",
    discount: 20,
    price: { was: 950, now: 760 },
    photo: offerPhotoSrc("novogodnyaya-skazka-v-gorode"),
    icon: "sparkles",
  },
  {
    slug: "tsirk-deda-moroza",
    title: "Цирк Деда Мороза: Лига зимних волшебников",
    kind: "Театральное новогоднее шоу",
    category: "kids",
    campaign: "mesta_msk",
    accent: "Сказка, цирк и новогоднее шоу",
    summary:
      "Новогодний спектакль о Деде Морозе и его помощниках-волшебниках, которые творят праздничную магию внутри снежного шара. Цирковые номера переплетаются со сказочным сюжетом.",
    facts: ["Цирк и сказка", "Скидка 20%"],
    forWhom: "Детям, которые любят цирк и большие красивые шоу",
    url: "https://gorbilet.ru/msk/actions/teatralnoe-novogodnee-tsirk-deda-moroza-liga-zimnih-volshebnikov/",
    discount: 20,
    price: { was: 790, now: 632 },
    photo: offerPhotoSrc("tsirk-deda-moroza"),
    icon: "tent",
  },
  {
    slug: "novyj-god-v-lukomore",
    title: "Новый год в Лукоморье",
    kind: "Интерактивное шоу",
    category: "kids",
    campaign: "mesta_msk",
    accent: "Праздничное шоу для всей семьи",
    summary:
      "Интерактивное шоу по мотивам русских сказок. Игры, песни и встречи со сказочными героями, а дети помогают волшебной стране сочинить новую зимнюю историю и защитить её.",
    facts: ["Русские сказки", "Игры и песни", "Скидка 20%"],
    forWhom: "Всей семье, особенно младшим школьникам и дошкольникам",
    url: "https://gorbilet.ru/msk/actions/prazdnichnoe-shou-novyj-god-v-lukomore/",
    discount: 20,
    price: { was: 990, now: 792 },
    photo: offerPhotoSrc("novyj-god-v-lukomore"),
    icon: "book",
  },
  {
    slug: "tri-kota-novyj-god",
    title: "Три Кота: Миу-Миу Новый год",
    kind: "Интерактивное шоу",
    category: "kids",
    campaign: "mesta_msk",
    accent: "Интерактивное новогоднее шоу для детей",
    summary:
      "Новогоднее интерактивное шоу с любимыми героями мультсериала «Три Кота». Подробности программы, возраст и даты смотрите на странице билета.",
    facts: ["Любимые герои", "Интерактив", "Скидка 20%"],
    forWhom: "Малышам и поклонникам мультсериала",
    url: "https://gorbilet.ru/msk/actions/interaktivnoe-shou-tri-kota-miu-miu-novyj-god/",
    discount: 20,
    price: { was: 790, now: 632 },
    photo: offerPhotoSrc("tri-kota-novyj-god"),
    icon: "cat",
  },
  {
    slug: "mechty-menyayushchie-mir",
    title: "Мечты, меняющие мир. Новые истории",
    kind: "Интерактивное шоу",
    category: "kids",
    campaign: "mesta_msk",
    accent: "Интерактивное шоу для детей постарше",
    summary:
      "Иммерсивный новогодний спектакль, который помогает детям открыть свои таланты и задуматься о будущей профессии. Научные опыты, трюковое шоу и интерактивные игры.",
    facts: ["Научные опыты", "Трюковое шоу", "Скидка 25%"],
    forWhom: "Детям постарше, которым уже скучно на классической ёлке",
    url: "https://gorbilet.ru/msk/actions/interaktivnoe-shou-mechty-menjajuschie-mir-novye-istorii/",
    discount: 25,
    price: { was: 790, now: 592 },
    photo: offerPhotoSrc("mechty-menyayushchie-mir"),
    icon: "rocket",
  },
  {
    slug: "salon-krasoty",
    title: "Салон красоты, или О чём говорят женщины",
    kind: "Спектакль",
    category: "adults",
    campaign: "spektakl_msk",
    accent: "Лёгкая комедия",
    summary:
      "Комедия о женском характере с пикантными анекдотами и детективной линией. В спектакле играют звёзды кино Наталья Бочкарёва, Жанна Эппле, Денис Матросов и другие.",
    facts: ["Наталья Бочкарёва", "Жанна Эппле", "Денис Матросов", "Скидка 30%"],
    forWhom: "Для вечера с подругами или вдвоём",
    url: "https://gorbilet.ru/msk/actions/spektakl-salon-krasoty-ili-o-chem-govorjat-zhenschiny-s-natalej-bochkarevoj-so-skidkoj-30/",
    discount: 30,
    price: { was: 1900, now: 1330 },
    photo: offerPhotoSrc("salon-krasoty"),
    icon: "drama",
  },
  {
    slug: "vitalya",
    title: "Виталя",
    kind: "Спектакль",
    category: "adults",
    campaign: "spektakl_msk",
    accent: "Марат Башаров и Наталья Бочкарёва",
    summary:
      "Комедия положений, где обычный ремонт запускает цепочку неожиданных событий. Герою приходится прикрывать одну ложь другой и выпутываться из всё более нелепых ситуаций. В ролях Марат Башаров, Наталья Бочкарёва и Анастасия Борисова.",
    facts: ["Марат Башаров", "Наталья Бочкарёва", "Скидка 30%"],
    forWhom: "Тем, кто хочет просто посмеяться после долгого дня прогулок",
    url: "https://gorbilet.ru/msk/actions/spektakl-vitalja-s-maratom-basharovym-i-natalej-bochkarevoj/",
    discount: 30,
    price: { was: 1300, now: 910 },
    photo: offerPhotoSrc("vitalya"),
    icon: "hammer",
  },
  {
    slug: "shou-pod-dozhdem",
    title: "Шоу под дождём. Сезон дождей",
    kind: "Спектакль-шоу",
    category: "adults",
    campaign: "spektakl_msk",
    accent: "Танец и пластика вместо слов",
    summary:
      "Пластический спектакль на стыке драмы и комедии, где главный язык это танец и движение. Необычный формат для тех, кто устал от классической сцены.",
    facts: ["Пластика и танец", "Драма и комедия", "Скидка 20%"],
    forWhom: "Тем, кто ищет зрелище, а не только сюжет",
    url: "https://gorbilet.ru/msk/actions/spektakl-shou-pod-dozhdem-sezon-dozhdej-so-skidkoj-30/",
    discount: 20,
    price: { was: 800, now: 640 },
    photo: offerPhotoSrc("shou-pod-dozhdem"),
    icon: "rain",
  },
  {
    slug: "poslednij-stendap-millionera",
    title: "Последний стендап миллионера",
    kind: "Спектакль",
    category: "adults",
    campaign: "spektakl_msk",
    accent: "Вечерний стендап",
    summary:
      "Богатый эксцентрик узнаёт, что ему осталось тридцать дней, и решает исполнить давние мечты. Но в его планы врывается женщина с чемоданом, которая называет себя учительницей аргентинского танго. В ролях Ефим Шифрин и другие.",
    facts: ["Ефим Шифрин", "Комедия", "Скидка 30%"],
    forWhom: "Для вечера, когда хочется и смеха, и немного чувств",
    url: "https://gorbilet.ru/msk/actions/spektakl-poslednij-stendap-millionera/",
    discount: 30,
    price: { was: 1000, now: 700 },
    photo: offerPhotoSrc("poslednij-stendap-millionera"),
    icon: "mic",
  },
  {
    slug: "rekordium",
    title: "Музей «Рекордиум»",
    kind: "Интерактивный музей",
    category: "family",
    campaign: "mesta_msk",
    accent: "Необычные рекорды и интерактивные экспонаты",
    summary:
      "Музей мировых рекордов природы, спорта и техники на Новом Арбате. На интерактивных экспонатах можно проверить свою силу, вес и скорость реакции.",
    facts: ["Новый Арбат", "Проверь себя", "Скидка 20%"],
    forWhom: "Семьям с азартными детьми и взрослыми",
    url: "https://gorbilet.ru/msk/actions/muzej-rekordium-so-skidkoj-20/",
    discount: 20,
    price: { was: 1000, now: 800 },
    photo: offerPhotoSrc("rekordium"),
    icon: "trophy",
  },
  {
    slug: "muzej-magii",
    title: "Музей Магии",
    kind: "Интерактивный музей",
    category: "family",
    campaign: "mesta_msk",
    accent: "Интерактивная магия для всей семьи",
    summary:
      "Интерактивное пространство на Новом Арбате. Около 200 экспонатов, 20 фотозон и шоу иллюзиониста каждый час. В стандартный билет входит иммерсивное шоу на выбор.",
    facts: ["Около 200 экспонатов", "20 фотозон", "Иллюзионист каждый час", "Скидка 20%"],
    forWhom: "Всей семье, когда хочется чуда без снега и мороза",
    url: "https://gorbilet.ru/msk/actions/muzej-magii-so-skidkoj-20/",
    discount: 20,
    price: { was: 1000, now: 800 },
    photo: offerPhotoSrc("muzej-magii"),
    icon: "wand",
  },
];

export const getOffer = (slug: string) => offers.find((o) => o.slug === slug);
export const byCategory = (c: Category) => offers.filter((o) => o.category === c);
/** Скидка в процентах: из цен, если они есть, иначе из поля discount */
export const discountOf = (o: Offer) => (o.price ? Math.round(((o.price.was - o.price.now) / o.price.was) * 100) : o.discount);
export const maxDiscount = Math.max(...offers.map((o) => discountOf(o) ?? 0));
