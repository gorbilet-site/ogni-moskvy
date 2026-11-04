"use client";

import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { contacts } from "@/lib/site";
import { cn } from "@/components/ui/primitives";

const topics = ["Вопрос по билету", "Партнёрство", "Для прессы", "Идея для подборки"];

/** Собирает письмо и открывает почтовую программу. Ничего не отправляет на сервер */
export function MailComposer() {
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 5) {
      setError("Напишите пару слов о вопросе, чтобы мы могли помочь");
      return;
    }
    setError(null);
    const subject = `${topic}. Огни Москвы`;
    const body = `${text.trim()}${name.trim() ? `\n\n${name.trim()}` : ""}`;
    window.location.href = `mailto:${contacts.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full rounded-2xl bg-white px-5 py-4 text-ink placeholder:text-ink/40 ring-1 ring-ink/15 transition-shadow focus:outline-none focus:ring-2 focus:ring-blue";

  return (
    <form onSubmit={submit} className="grid gap-5" noValidate>
      <fieldset>
        <legend className="text-[0.95rem] font-medium text-mute">Тема</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="peer sr-only" />
              <span
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ring-1 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-blue",
                  topic === t ? "bg-blue text-white ring-blue" : "text-ink/75 ring-ink/15 hover:ring-ink/40",
                )}
              >
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="mc-name" className="text-sm text-mute">
          Как к вам обращаться
        </label>
        <input id="mc-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={cn(field, "mt-2")} placeholder="Имя" />
      </div>
      <div>
        <label htmlFor="mc-text" className="text-sm text-mute">
          Сообщение
        </label>
        <textarea
          id="mc-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "mc-error" : "mc-hint"}
          className={cn(field, "mt-2 resize-y")}
          placeholder="Например, номер заказа и что случилось"
        />
        {error ? (
          <p id="mc-error" className="mt-2 text-sm text-blue-deep">
            {error}
          </p>
        ) : (
          <p id="mc-hint" className="mt-2 text-sm text-ink/45">
            Письмо откроется в вашей почтовой программе, адрес {contacts.email}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="group inline-flex min-h-14 w-fit items-center gap-2.5 rounded-full bg-blue px-7 text-[1.1875rem] font-bold text-white transition-shadow duration-500 hover:shadow-[0_14px_40px_-12px_rgb(59_139_235/0.7)]"
      >
        Написать письмо
        <Mail className="size-5 transition-transform group-hover:-rotate-12" aria-hidden />
      </button>
    </form>
  );
}
