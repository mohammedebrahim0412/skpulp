"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { company, nav } from "@/config/site";
import { Arrow } from "./ui/Primitives";

/**
 * Brand lock-up: full-colour emblem + name. The emblem is drawn for light surfaces;
 * on dark backgrounds (`tone="dark"`) it sits on a paper-coloured badge.
 */
export function Wordmark({ tone = "light", tagline = true }: { tone?: "light" | "dark"; tagline?: boolean }) {
  const dark = tone === "dark";
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap">
      <span
        aria-hidden
        className={`grid shrink-0 place-items-center rounded-full ${
          dark ? "size-12 bg-paper ring-1 ring-black/5" : "size-10 min-[360px]:size-11 md:size-12"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-mark-128.png" alt="" width={128} height={128} className={dark ? "size-[92%]" : "size-full"} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.98rem] font-extrabold tracking-[-0.02em] min-[360px]:text-[1.08rem] md:text-[1.2rem] ${
            dark ? "text-paper" : "text-forest"
          }`}
        >
          SK PULP <span className={dark ? "text-leaf" : "text-leaf-600"}>&amp;</span> FIBRE
        </span>
        {tagline && (
          <span
            className={`mt-1 text-[0.5rem] font-bold uppercase tracking-[0.2em] min-[360px]:text-[0.54rem] ${
              dark ? "text-paper/55" : "text-leaf-700"
            }`}
          >
            High Strength Secondary Pulp
          </span>
        )}
      </span>
    </span>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const menuBtn = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently at the reading line (45% down the viewport)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const line = window.innerHeight * 0.45;
      let current: string = nav[0].href;
      for (const n of nav) {
        const el = document.querySelector<HTMLElement>(n.href);
        if (el && el.getBoundingClientRect().top <= line) current = n.href;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Drawer: lock scroll, close on Escape, keep focus inside
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = drawer.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && drawer.current) {
        const f = Array.from(drawer.current.querySelectorAll<HTMLElement>("a,button"));
        const [a, z] = [f[0], f[f.length - 1]];
        if (e.shiftKey && document.activeElement === a) (e.preventDefault(), z.focus());
        else if (!e.shiftKey && document.activeElement === z) (e.preventDefault(), a.focus());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      menuBtn.current?.focus();
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-forest focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={`pt-safe fixed inset-x-0 top-0 z-50 border-b bg-white text-charcoal transition-shadow duration-500 ${
          scrolled || open ? "border-charcoal/10 shadow-[0_8px_30px_-18px_rgba(14,58,36,0.35)]" : "border-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[4.75rem]">
          <a href="#home" aria-label={`${company.name} — home`} className="-m-2 p-2">
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    aria-current={active === n.href ? "true" : undefined}
                    className="relative px-3 py-2 text-[0.88rem] font-semibold text-charcoal/70 transition-colors hover:text-leaf-700 aria-[current]:text-leaf-700"
                  >
                    {n.label}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-leaf-600 transition-transform duration-500 ease-cine ${
                        active === n.href ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group hidden min-h-11 items-center gap-2 rounded-md bg-leaf-700 px-5 text-sm font-bold text-white transition-colors hover:bg-forest sm:inline-flex"
            >
              Get a Quote <Arrow className="size-3.5" />
            </a>
            <a
              href="#contact"
              className="hidden min-h-10 items-center rounded-md bg-leaf-700 px-3 text-[0.78rem] font-bold text-white min-[400px]:inline-flex sm:hidden"
            >
              Quote
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative -mr-2 grid size-11 place-items-center xl:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-cine ${
                    open ? "translate-y-[5.25px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-current transition-all duration-500 ease-cine ${
                    open ? "w-full -translate-y-[5.25px] -rotate-45" : "w-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-black/50 xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              key="drawer"
              id="mobile-menu"
              ref={drawer}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="pb-safe fixed bottom-0 right-0 top-0 z-40 flex w-full max-w-sm flex-col bg-white pt-[calc(4rem+env(safe-area-inset-top))] text-charcoal xl:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.55 }}
            >
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pt-6">
                <ul className="flex flex-col">
                  {nav.map((n, i) => (
                    <motion.li
                      key={n.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-charcoal/10"
                    >
                      <a
                        href={n.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-14 items-center justify-between py-3 text-2xl font-semibold tracking-[-0.02em]"
                      >
                        <span className={active === n.href ? "text-leaf-700" : "text-charcoal/80"}>{n.label}</span>
                        <span className="text-xs font-medium text-steel">0{i + 1}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="px-6 pb-8 pt-6">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="group flex min-h-13 items-center justify-center gap-3 rounded-md bg-leaf-700 px-6 font-bold text-white"
                >
                  Get a Quote <Arrow />
                </a>
                <p className="mt-5 text-center text-xs text-steel">{company.location.full}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
