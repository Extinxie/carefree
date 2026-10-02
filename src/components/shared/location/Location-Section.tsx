"use client";

import { LocationMap } from "./Location-Map";

export function LocationSection() {
  return (
    <section
      id="locations"
      className="relative px-5 py-24 md:px-8 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-end justify-between gap-8 lg:mb-20">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#171613]/40">
              Find us
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,9vw,8rem)] font-medium leading-[0.88] tracking-[-0.055em] text-[#171613]">
              Come by.
            </h2>
          </div>

          <p className="hidden max-w-[28ch] text-right text-sm leading-relaxed text-[#171613]/50 md:block">
            Исторический центр Краснодара.
            <br />
            Просто приходи на кофе.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[2rem] bg-[#d8cebd] lg:grid-cols-[0.35fr_1fr]">
          {/* INFO */}

          <div className="flex min-h-[420px] flex-col justify-between bg-[#171613] p-7 text-[#f3efe7] md:p-10 lg:min-h-[620px]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                Carefree / 01
              </p>

              <h3 className="mt-10 font-[family-name:var(--font-display)] text-4xl leading-[0.95] tracking-[-0.04em] md:text-5xl">
                Slow down.
                <br />
                You’re here.
              </h3>
            </div>

            <div>
              <p className="text-[17px]">Surf Coffee × Post</p>

              <p className="mt-2 text-sm leading-relaxed text-white/45">
                Постовая, 55
                <br />
                Краснодар, Россия
              </p>

              <div className="mt-8 flex flex-col gap-2 text-sm text-white/45">
                <span>Пн–Пт · 07:30–23:00</span>
                <span>Сб–Вс · 09:00–23:00</span>
              </div>

              <a
                href="https://yandex.ru/maps/?ll=38.9718%2C45.0142&z=17"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex border-b border-white/30 pb-1 text-sm text-white transition-colors hover:border-white"
              >
                Открыть маршрут ↗
              </a>
            </div>
          </div>

          <div className="h-[520px] lg:h-[620px]">
            <LocationMap />
          </div>
        </div>
      </div>
    </section>
  );
}
