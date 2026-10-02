"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { Menu, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { Button } from "../../ui/button";

const navItems = [
  {
    label: "Menu",
    href: "#menu",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Locations",
    href: "#locations",
  },
];

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  const logoRef = useRef<HTMLAnchorElement>(null);

  const navRef = useRef<HTMLElement>(null);

  const ctaRef = useRef<HTMLAnchorElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        logoRef.current,
        {
          y: -30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
      )
        .fromTo(
          navRef.current?.children ?? [],
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.55",
        )
        .fromTo(
          ctaRef.current,
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.45",
        );
    }, headerRef);

    const handleScroll = () => {
      if (!headerRef.current) return;

      const scrolled = window.scrollY > 80;

      gsap.to(headerRef.current, {
        paddingTop: scrolled ? "14px" : "28px",

        paddingBottom: scrolled ? "14px" : "28px",

        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      ctx.revert();
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="
          fixed
          left-0
          top-0
          z-50
          w-full
          px-5
          py-7
          md:px-8
          lg:px-10
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1600px]
            items-center
            justify-between
          "
        >
          <Link
            ref={logoRef}
            href="/"
            className="
              relative
              z-50
              text-[17px]
              font-semibold
              tracking-[0.22em]
              text-[#171613]
            "
          >
            CAREFREE
          </Link>

          <nav
            ref={navRef}
            className="
              absolute
              left-1/2
              hidden
              -translate-x-1/2
              items-center
              gap-9
              md:flex
            "
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  group
                  relative
                  py-2
                  text-[13px]
                  font-medium
                  tracking-[0.08em]
                  text-[#171613]
                "
              >
                {item.label}

                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-0
                    bg-[#171613]
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              ref={ctaRef}
              href="https://t.me/ExtinctHaze"
              className="
                group
                hidden
                items-center
                gap-2
                rounded-full
                bg-[#171613]
                px-5
                py-3
                text-[12px]
                font-medium
                tracking-[0.08em]
                text-[#f3efe7]
                transition-transform
                duration-500
                hover:scale-[1.04]
                md:flex
              "
            >
              Order coffee
              <ArrowUpRight
                size={14}
                strokeWidth={1.7}
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>

            <Button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="
                relative
                z-50
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-[#171613]
                text-[#f3efe7]
                md:hidden
              "
            >
              <Menu size={19} strokeWidth={1.6} />
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-[-1]
          hidden
          overflow-hidden
          md:block
        "
      ></div>
    </>
  );
}
