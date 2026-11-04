import type { Metadata } from "next";
import { ArrowUpRight, LifeBuoy, Mail, MessageCircle, Send, Undo2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { MailComposer } from "@/components/contacts/MailComposer";
import { FadeIn } from "@/components/ui/Reveal";
import { contacts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Поддержка Горбилета в Telegram, ВКонтакте и MAX, почта для партнёров и прессы, возврат и повторное получение билетов.",
  alternates: { canonical: "/kontakty" },
};

const channels = [
  { href: contacts.telegram, icon: Send, title: "Telegram", text: "Бот поддержки Горбилета. Самый быстрый способ решить вопрос по заказу." },
  { href: contacts.vk, icon: MessageCircle, title: "ВКонтакте", text: "Сообщения сообщества «Горбилет Турист»." },
  { href: contacts.max, icon: LifeBuoy, title: "MAX", text: "Бот поддержки в мессенджере MAX." },
  { href: contacts.tickets, icon: Undo2, title: "Возврат и повторное получение", text: "Сервис tickets.gorbilet.ru, чтобы вернуть билет или получить его ещё раз." },
];

export default function ContactsPage() {
  return (
    <>
      <PageHero mascot="wave" title={["Мы на связи"]} lead="Вопросы по заказу быстрее всего решает поддержка в мессенджерах. Для партнёрства и прессы пишите на почту." />
      <section className="bg-white pb-28">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <ul className="border-t border-ink/12 lg:col-span-6">
            {channels.map((c, i) => (
              <li key={c.title}>
                <FadeIn delay={i * 0.06}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener"
                    className="group flex items-start gap-5 border-b border-ink/12 py-7 transition-colors hover:border-blue/40"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-paper text-blue-deep ring-1 ring-ink/10 transition-colors group-hover:bg-blue group-hover:text-ink">
                      <c.icon className="size-5" aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span className="display block text-[1.45rem] leading-[1.15] text-ink">{c.title}</span>
                      <span className="mt-2 block leading-relaxed text-ink/60">{c.text}</span>
                    </span>
                    <ArrowUpRight className="mt-2 size-5 text-ink/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-blue-deep" aria-hidden />
                    <span className="sr-only"> (откроется в новой вкладке)</span>
                  </a>
                </FadeIn>
              </li>
            ))}
            <li className="pt-8">
              <a href={`mailto:${contacts.email}`} className="inline-flex items-center gap-3 text-lg text-ink/80 hover:text-blue-deep">
                <Mail className="size-5" aria-hidden />
                {contacts.email}
              </a>
              <p className="mt-2 text-sm text-ink/45">ООО «Горбилет»</p>
            </li>
          </ul>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-[2rem] bg-paper p-7 ring-1 ring-ink/10 sm:p-10">
              <h2 className="display text-[clamp(1.4rem,3vw,2.2rem)] text-ink">Написать нам</h2>
              <p className="mt-3 leading-relaxed text-ink/60">Соберём письмо за вас, останется только нажать «Отправить» в почте.</p>
              <div className="mt-8">
                <MailComposer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
