import Home from "@/app/page";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";

/** Та же главная, что и на сайте, но без Next.js: для одного HTML-файла */
export function App() {
  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-white transition-transform focus:translate-y-0"
      >
        Перейти к содержанию
      </a>
      <Providers>
        <Header />
        <main id="main" className="flex-1">
          <Home />
        </main>
        <Footer />
      </Providers>
    </div>
  );
}
