"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, CupSoda } from "lucide-react";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const items = footer.querySelectorAll("[data-footer-reveal]");

      gsap.fromTo(
        items,
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="about"
      className="relative overflow-hidden bg-[#171613] text-[#f3efe7]"
    >
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-24 md:px-8 lg:px-10 lg:pb-32 lg:pt-40">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.7fr] lg:gap-24">
          <div>
            <p
              data-footer-reveal
              className="mb-8 text-xs uppercase tracking-[0.2em] text-white/35"
            >
              About Carefree
            </p>

            <h2
              data-footer-reveal
              className="max-w-[10ch] font-[family-name:var(--font-display)] text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.82] tracking-[-0.065em]"
            >
              Good coffee.
              <br />
              No big deal.
            </h2>
          </div>

          <div className="flex flex-col justify-end lg:pb-3">
            <p
              data-footer-reveal
              className="max-w-[38ch] text-[18px] leading-[1.55] text-white/65 md:text-[20px]"
            >
              Carefree — место, куда заходят за кофе, а остаются немного дольше,
              чем собирались.
            </p>

            <p
              data-footer-reveal
              className="mt-6 max-w-[38ch] text-[15px] leading-[1.6] text-white/35"
            >
              Никакой спешки. Никакого сложного ритуала. Хорошие зёрна, тёплая
              чашка и немного времени для себя.
            </p>
          </div>
        </div>

        <div className="my-20 h-px bg-white/10 lg:my-28" />

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div data-footer-reveal>
            <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Visit
            </p>

            <p className="text-[16px] leading-relaxed">
              Постовая, 55
              <br />
              Краснодар, Россия
            </p>

            <a
              href="#locations"
              className="group mt-5 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              На карте
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          <div data-footer-reveal>
            <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Hours
            </p>

            <p className="text-[16px] leading-relaxed">
              Пн–Пт
              <span className="text-white/40"> 07:30–23:00</span>
              <br />
              Сб–Вс
              <span className="text-white/40"> 09:00–23:00</span>
            </p>
          </div>

          <div data-footer-reveal>
            <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Contact
            </p>

            <a
              href="mailto:extracerberuss@gmail.com"
              className="group inline-flex items-center gap-2 text-[15px] text-white/70 transition-colors hover:text-white"
            >
              extracerberuss@gmail.com
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <p className="mt-3 text-sm text-white/30">
              Для сотрудничества и вопросов
            </p>
          </div>

          <div data-footer-reveal>
            <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Follow
            </p>

            <a
              href="https://github.com/Extinxie"
              className="group inline-flex items-center gap-2 text-[15px] text-white/70 transition-colors hover:text-white"
            >
              Instagram
              <CupSoda
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:rotate-12"
              />
            </a>
          </div>
        </div>

        <div className="mt-24 lg:mt-36">
          <a href="mailto:extracerberuss@gmail.com" className="group block">
            <div className="flex items-end justify-between border-b border-white/15 pb-5">
              <span className="font-[family-name:var(--font-display)] text-[clamp(2.8rem,8vw,8rem)] font-medium leading-none tracking-[-0.055em] transition-transform duration-700 group-hover:translate-x-2">
                Say hello.
              </span>

              <ArrowUpRight
                className="mb-2 h-8 w-8 transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2 md:h-12 md:w-12"
                strokeWidth={1}
              />
            </div>
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-5 py-7 text-[11px] text-white/30 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>© 2026 Carefree Coffee</span>
            <span>Краснодар</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Designed & developed by</span>

            <a
              href="https://t.me/ExtinctHaze"
              target="_blank"
              rel="noreferrer"
              className="text-white/65 transition-colors hover:text-white"
            >
              ExtinctHaze
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
