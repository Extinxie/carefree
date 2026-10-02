"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, X } from "lucide-react";

const links = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Locations", href: "#locations" },
  { label: "Order", href: "#order" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const linksContainer = linksRef.current;

    if (!menu || !linksContainer) return;

    const items = Array.from(linksContainer.children);

    gsap.killTweensOf(menu);
    gsap.killTweensOf(items);

    if (open) {
      document.body.style.overflow = "hidden";

      gsap.set(menu, {
        display: "block",
        clipPath: "inset(0 0 100% 0)",
      });

      gsap.set(items, {
        y: 40,
        opacity: 0,
      });

      const tl = gsap.timeline();

      tl.to(menu, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.7,
        ease: "power4.inOut",
      }).to(
        items,
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.3",
      );
    } else {
      document.body.style.overflow = "";

      gsap.to(items, {
        y: 20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });

      gsap.to(menu, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.45,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(menu, {
            display: "none",
          });
        },
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-100 hidden bg-[#171613] text-[#f3efe7]"
    >
      <div className="flex h-full flex-col px-6 pb-8 pt-7">
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-semibold tracking-[0.22em]">
            CAREFREE
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="relative z-110 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15"
          >
            <X size={19} strokeWidth={1.5} />
          </button>
        </div>

        <div ref={linksRef} className="my-auto flex flex-col">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="group flex items-center justify-between border-b border-white/10 py-5 text-[clamp(2.7rem,13vw,5rem)] font-medium leading-none tracking-tighter"
            >
              <span>{link.label}</span>

              <ArrowUpRight
                size={28}
                strokeWidth={1}
                className="opacity-40 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
              />
            </a>
          ))}
        </div>

        <div className="flex items-end justify-between text-xs tracking-[0.08em] text-white/45">
          <span>
            GOOD COFFEE.
            <br />
            NO BIG DEAL.
          </span>

          <span>
            52° 22′ N
            <br />
            4° 54′ E
          </span>
        </div>
      </div>
    </div>
  );
}
