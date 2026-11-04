"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, RotateCcw, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { checklist } from "@/data/guide";
import { Garland } from "@/components/decor/Garland";
import { Mascot } from "@/components/brand/Mascot";
import { RevealTitle } from "@/components/ui/Reveal";
import { cn } from "@/components/ui/primitives";
import { plural } from "@/lib/plural";

const KEY = "ogni-moskvy:checklist";

export function Checklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- восстановление из хранилища после гидрации
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);

  const update = (next: Record<string, boolean>) => {
    setDone(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const lit = checklist.map((c) => Boolean(done[c.id]));
  const count = lit.filter(Boolean).length;
  const all = count === checklist.length;

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  const share = async () => {
    const left = checklist
      .filter((c) => !done[c.id])
      .map((c) => `○ ${c.title}`);
    const ok = checklist.filter((c) => done[c.id]).map((c) => `● ${c.title}`);
    const text = `Новогодняя Москва. Мой чек-лист\n\n${[...ok, ...left].join("\n")}\n\n${window.location.origin}/#chek-list`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Чек-лист новогодней Москвы", text });
        return;
      }
      await navigator.clipboard.writeText(text);
      flash("Чек-лист скопирован");
    } catch {
      // пользователь закрыл окно «Поделиться»
    }
  };

  const bar = (
    <>
      <Garland
        bulbs={checklist.length}
        lit={lit}
        swags={2}
        depth={70}
        bulbScale={2.1}
        tone="light"
        className="h-12 w-full sm:h-auto"
        label={`Гирлянда: горит ${count} из ${checklist.length}`}
      />
      <div
        className="mt-2 flex items-center justify-between gap-2 sm:gap-4"
        aria-live="polite"
      >
        <p className="text-[0.95rem] font-medium text-ink/70">
          <span className="display tabular-nums text-blue-deep">{count}</span>{" "}
          из&nbsp;{checklist.length}{" "}
          {plural(checklist.length, ["огонька", "огоньков", "огоньков"])}{" "}
          {count === 1 ? "горит" : "горят"}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={share}
            className="grid size-11 place-items-center rounded-full text-ink/70 transition-colors hover:bg-blush hover:text-blue-deep"
            aria-label="Поделиться чек-листом"
          >
            <Share2 className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => update({})}
            disabled={count === 0}
            className="grid size-11 place-items-center rounded-full text-ink/70 transition-colors hover:bg-blush hover:text-blue-deep disabled:opacity-30"
            aria-label="Сбросить отметки"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <section
      id="chek-list"
      className="relative bg-white py-16 sm:py-32"
      aria-labelledby="checklist-title"
    >
      <div className="shell grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <RevealTitle
              id="checklist-title"
              lines={["Что обязательно", "сделать в новогодней", "Москве"]}
              className="display text-[clamp(1.45rem,2.9vw,2.6rem)] text-ink"
            />
            <p className="mt-6 max-w-md text-lg leading-[1.45] text-ink/70">
              Отмечайте, что уже успели. Каждый пункт зажигает свою лампочку, а прогресс сохранится в этом браузере.
            </p>

            <div className="mt-8 hidden lg:block">{bar}</div>

            <AnimatePresence mode="wait">
              {all ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 flex items-end gap-5"
                >
                  <Mascot pose="wave" className="w-28 shrink-0 sm:w-32" />
                  <p className="display pb-4 text-xl text-blue-deep sm:text-2xl">Вся гирлянда горит. С наступающим!</p>
                </motion.div>
              ) : (
                <motion.div key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-10 hidden lg:block">
                  <Mascot pose="stretch" className="w-48" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="sticky top-[4.5rem] z-20 -mx-5 mb-4 bg-white/95 px-5 pb-2 pt-1 backdrop-blur-md sm:top-[5.25rem] lg:hidden">
            {bar}
          </div>
          <ul className="grid gap-2">
            {checklist.map((item) => {
              const on = Boolean(done[item.id]);
              return (
                <li key={item.id}>
                  <label
                    className={cn(
                      "group relative flex cursor-pointer gap-3 rounded-2xl p-3 transition-colors duration-500 sm:gap-5 sm:p-6",
                      on ? "bg-blush/60" : "hover:bg-paper",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={on}
                      onChange={(e) =>
                        update({ ...done, [item.id]: e.target.checked })
                      }
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-expo peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white",
                        on
                          ? "border-blue bg-blue text-white shadow-[0_0_24px_rgb(59_139_235/0.55)]"
                          : "border-2 border-ink/20 text-transparent group-hover:border-blue",
                      )}
                    >
                      <motion.span
                        initial={false}
                        animate={{ scale: on ? 1 : 0.4, opacity: on ? 1 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 26,
                        }}
                      >
                        <Check className="size-4" strokeWidth={3} />
                      </motion.span>
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-lg font-semibold leading-[1.25] transition-colors duration-500 sm:text-xl",
                          on ? "text-blue-deep" : "text-ink",
                        )}
                      >
                        {item.title}
                      </span>
                      <span className="mt-1.5 block leading-[1.45] text-ink/65">
                        {item.text}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
