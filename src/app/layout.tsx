import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { site } from "@/lib/site";

const inter = localFont({
  src: "../fonts/InterVariable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const druk = localFont({
  src: "../fonts/DrukWideCy-Medium.woff2",
  variable: "--font-druk",
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Новогодняя Москва со скидками. Чёрная пятница для яркого Нового года",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "новогодняя Москва",
    "чёрная пятница билеты",
    "куда сходить в Москве на новогодние каникулы",
    "новогодние ёлки Москва 2027",
    "экскурсии по Москве зимой",
    "смотровые площадки Москвы",
    "спектакли Москва скидки",
  ],
  authors: [{ name: "Горбилет", url: "https://gorbilet.ru" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
    title: "Едем в Москву на праздники",
    description: "Что посмотреть, куда сходить и какие билеты купить со скидкой в Чёрную пятницу.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Новогодняя Москва от Горбилета, силуэт Кремля под гирляндой" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg` },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#3b8beb",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${inter.variable} ${druk.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-white transition-transform focus:translate-y-0"
        >
          Перейти к содержанию
        </a>
        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
