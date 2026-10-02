"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CoffeeScrollOrb } from "../../lib";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
        });

        tl.from("[data-line]", {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.12,
          delay: 0.25,
        })
          .fromTo(
            "[data-photo-wrap]",
            {
              clipPath: "inset(100% 0% 0% 0%)",
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.35,
              ease: "power4.inOut",
            },
            0.2,
          )
          .fromTo(
            "[data-photo]",
            {
              scale: 1.12,
            },
            {
              scale: 1,
              duration: 1.8,
              ease: "power3.out",
            },
            0.2,
          )
          .from(
            "[data-fade]",
            {
              opacity: 0,
              y: 16,
              duration: 0.8,
              stagger: 0.08,
            },
            "-=0.9",
          );

        gsap.fromTo(
          "[data-parallax]",
          {
            yPercent: -4,
          },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 md:px-8 lg:px-10 lg:pb-12"
    >
      <CoffeeScrollOrb />
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative z-10 lg:col-span-7">
          <h1 className="font-(family-name:--font-display) text-[clamp(2.9rem,13vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-[#171613] lg:text-[clamp(4.5rem,8vw,9rem)]">
            <span className="block overflow-hidden py-[0.06em]">
              <span data-line className="block">
                Good coffee.
              </span>
            </span>

            <span className="block overflow-hidden py-[0.06em] lg:pl-[1.1em]">
              <span data-line className="block">
                No big deal.
              </span>
            </span>
          </h1>

          <p
            data-fade
            className="mt-8 max-w-[34ch] text-[17px] leading-relaxed text-[#171613]/70 lg:mt-10"
          >
            Свежая обжарка, спокойная музыка и столик у окна. Заходи на чашку, а
            не на событие.
          </p>

          <div data-fade className="mt-9 flex flex-wrap items-center gap-6">
            <a
              href="#menu"
              className="inline-flex items-center rounded-full bg-[#171613] px-7 py-4 text-[14px] font-medium tracking-[0.02em] text-[#f7f4ee] transition-transform duration-500 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171613]"
            >
              Смотреть меню
            </a>

            <a
              href="#locations"
              className="group relative inline-flex items-center gap-2 py-2 text-[14px] font-medium text-[#171613]"
            >
              Где нас найти
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
              <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#171613] transition-transform duration-500 group-hover:scale-x-0" />
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-155 lg:col-span-5 lg:max-w-none">
          <div
            data-fade
            className="absolute -left-1 top-0 z-20 hidden -translate-y-1/2 items-center gap-3 lg:flex"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#171613]/40">
              Carefree
            </span>

            <span className="h-px w-10 bg-[#171613]/15" />
          </div>

          <div
            data-photo-wrap
            className="relative aspect-[0.88] w-full overflow-hidden rounded-[2rem] bg-[#d9cfbf] shadow-[0_35px_80px_-45px_rgba(23,22,19,0.5)] md:rounded-[2.5rem]"
          >
            <div
              data-parallax
              className="absolute inset-[-5%] will-change-transform"
            >
              <div data-photo className="relative h-full w-full">
                <Image
                  src="/bg/coffe.jpg"
                  alt="Интерьер кофейни Carefree"
                  fill
                  priority
                  quality={88}
                  sizes="(min-width: 1024px) 42vw, (min-width: 640px) 620px, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171613]/20 via-transparent to-white/[0.04]" />

            <div className="absolute left-5 top-5 rounded-full bg-[#f7f4ee]/85 px-3.5 py-2 backdrop-blur-md">
              <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#171613]">
                Good coffee
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">
                  Krasnodar
                </p>

                <p className="mt-1 text-[14px] text-white">Постовая, 55</p>
              </div>

              <span className="text-[10px] uppercase tracking-[0.16em] text-white/50">
                Est. 2026
              </span>
            </div>
          </div>

          <div
            data-fade
            className="absolute -bottom-5 left-4 z-20 flex items-center gap-3 rounded-full bg-[#f7f4ee]/95 py-3 pl-4 pr-6 shadow-[0_18px_50px_-18px_rgba(23,22,19,0.4)] backdrop-blur-md md:-left-7"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>

            <span className="text-[13px] leading-tight text-[#171613]">
              Открыто сегодня
              <br />
              <span className="text-[#171613]/50">7:30 – 23:00</span>
            </span>
          </div>

          <div
            data-fade
            className="absolute -right-5 top-1/2 hidden h-28 w-px -translate-y-1/2 bg-[#171613]/10 lg:block"
          />

          <span
            data-fade
            className="absolute -right-9 top-1/2 hidden -translate-y-1/2 rotate-90 text-[9px] uppercase tracking-[0.22em] text-[#171613]/30 lg:block"
          >
            Coffee / People / Time
          </span>
        </div>
      </div>

      <a
        href="#menu"
        aria-label="Прокрутить вниз"
        data-fade
        className="absolute bottom-6 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-[#171613]/20 text-[#171613] transition-all duration-500 hover:bg-[#171613] hover:text-[#f7f4ee] lg:flex"
      >
        <ArrowDown size={17} strokeWidth={1.5} />
      </a>
    </section>
  );
}
