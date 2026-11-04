import { Garland } from "@/components/decor/Garland";
import { Mascot } from "@/components/brand/Mascot";
import { ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="blue-sky relative overflow-hidden pb-20 pt-32 text-ink">
      <Garland bulbs={9} lit={[true, false, true, true, false, true, false, true, true]} swags={1} depth={40} className="mx-auto w-full max-w-md px-5" />
      <div className="shell mt-10 grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="display text-[clamp(1.8rem,5.6vw,4.6rem)]">Здесь перегорела лампочка</h1>
          <p className="mt-6 max-w-md text-2xl leading-[1.3]">Такой страницы нет. Возможно, ссылка устарела. Вернитесь на главную или откройте все билеты.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" variant="white">
              На главную
            </ButtonLink>
            <ButtonLink href="/afisha" variant="outline-ink">
              Все билеты
            </ButtonLink>
          </div>
        </div>
        <Mascot pose="stretch" className="w-48 sm:w-60 lg:col-span-4 lg:ml-auto" />
      </div>
    </section>
  );
}
