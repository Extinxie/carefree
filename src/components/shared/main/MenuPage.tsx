"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import { CoffeeBeans } from "./CoffeeBeans";
import { items } from "../../lib/constants";

gsap.registerPlugin(ScrollTrigger);

export const MenuPageComponent = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = root.querySelectorAll<HTMLElement>("[data-card]");

        gsap.set(cards, {
          y: 70,
          opacity: 0,
        });

        ScrollTrigger.batch(cards, {
          start: "top 90%",
          once: true,

          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.12,
              ease: "power3.out",
              overwrite: true,
            });
          },
        });
      });

      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cleanups: Array<() => void> = [];

          root.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
            const tilt = card.querySelector<HTMLElement>("[data-tilt]");

            if (!tilt) return;

            const rotationX = gsap.quickTo(tilt, "rotationX", {
              duration: 0.6,
              ease: "power3.out",
            });

            const rotationY = gsap.quickTo(tilt, "rotationY", {
              duration: 0.6,
              ease: "power3.out",
            });

            gsap.set(tilt, {
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            });

            const move = (event: MouseEvent) => {
              const rect = card.getBoundingClientRect();

              const x = (event.clientX - rect.left) / rect.width - 0.5;

              const y = (event.clientY - rect.top) / rect.height - 0.5;

              rotationY(x * 8);
              rotationX(-y * 8);
            };

            const leave = () => {
              rotationX(0);
              rotationY(0);
            };

            card.addEventListener("mousemove", move);

            card.addEventListener("mouseleave", leave);

            cleanups.push(() => {
              card.removeEventListener("mousemove", move);

              card.removeEventListener("mouseleave", leave);
            });
          });

          return () => {
            cleanups.forEach((cleanup) => cleanup());
          };
        },
      );
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="menu"
      className="
        relative
        px-5
        pb-32
        pt-28
        md:px-8
        lg:px-10
        lg:pb-44
        lg:pt-40
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >
        <CoffeeBeans />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1600px]
        "
      >
        <div
          className="
            mb-16
            flex
            flex-col
            gap-8
            lg:mb-24
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <h2
            className="
              font-[family-name:var(--font-display)]
              text-[clamp(2.9rem,11vw,5rem)]
              font-medium
              leading-[0.92]
              tracking-[-0.045em]
              text-[#171613]
              lg:text-[clamp(4.5rem,7.5vw,8.5rem)]
            "
          >
            Выбирай,
            <br />
            не торопись.
          </h2>

          <div
            className="
              flex
              max-w-[34ch]
              flex-col
              items-start
              gap-6
            "
          >
            <p
              className="
                text-[17px]
                leading-relaxed
                text-[#171613]/70
              "
            >
              Короткое меню: всё, что мы делаем, мы делаем хорошо. Остальное
              просто не варим.
            </p>

            <a
              href="#order"
              className="
                group
                relative
                py-2
                text-[14px]
                font-medium
                text-[#171613]
              "
            >
              Сделать заказ
              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-px
                  w-full
                  origin-left
                  bg-[#171613]
                  transition-transform
                  duration-500
                  group-hover:scale-x-0
                "
              />
            </a>
          </div>
        </div>

        <div
          className="
            grid
            gap-x-6
            gap-y-14
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-8
            lg:gap-y-20
          "
        >
          {items.map((item, index) => (
            <article
              key={item.name}
              data-card
              className={`group ${index % 3 === 1 ? "lg:mt-24" : ""}`}
            >
              <div
                data-tilt
                className="
                    relative
                    aspect-[4/5]
                    overflow-hidden
                    rounded-[2rem]
                    bg-[#d9cfbf]
                    shadow-[0_30px_60px_-30px_rgba(23,22,19,0.45)]
                    will-change-transform
                  "
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  quality={85}
                  sizes="
                      (min-width: 1024px) 30vw,
                      (min-width: 640px) 45vw,
                      100vw
                    "
                  className="
                      object-cover
                      transition-transform
                      duration-[900ms]
                      ease-out
                      group-hover:scale-[1.06]
                    "
                />

                <div
                  className="
                      absolute
                      inset-x-0
                      bottom-0
                      h-1/3
                      bg-gradient-to-t
                      from-[#171613]/40
                      to-transparent
                    "
                />

                <span
                  className="
                      absolute
                      left-4
                      top-4
                      rounded-full
                      bg-[#f3efe7]/90
                      px-3.5
                      py-1.5
                      text-[12px]
                      font-medium
                      text-[#171613]
                      backdrop-blur-md
                    "
                >
                  {item.tag}
                </span>

                <a
                  href="#order"
                  aria-label={`Заказать: ${item.name}`}
                  className="
                      absolute
                      bottom-4
                      right-4
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-[#f3efe7]
                      text-[#171613]
                      transition-all
                      duration-500
                      hover:scale-110
                      hover:bg-[#171613]
                      hover:text-[#f3efe7]
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-[#f3efe7]
                    "
                >
                  <ArrowUpRight size={20} strokeWidth={1.6} />
                </a>
              </div>

              <div
                className="
                    mt-5
                    flex
                    items-start
                    justify-between
                    gap-6
                    px-1
                  "
              >
                <div>
                  <h3
                    className="
                        font-[family-name:var(--font-display)]
                        text-[26px]
                        font-medium
                        leading-none
                        tracking-[-0.03em]
                        text-[#171613]
                      "
                  >
                    {item.name}
                  </h3>

                  <p
                    className="
                        mt-2.5
                        max-w-[30ch]
                        text-[15px]
                        leading-snug
                        text-[#171613]/60
                      "
                  >
                    {item.note}
                  </p>
                </div>

                <span
                  className="
                      whitespace-nowrap
                      pt-0.5
                      text-[17px]
                      font-medium
                      text-[#171613]
                    "
                >
                  {item.price}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
