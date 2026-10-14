"use client";

import { useEffect } from "react";

/**
 * Adds `.is-in` to every [data-reveal] element as it enters the viewport,
 * including elements mounted later (e.g. after a responsive layout swap).
 */
export function useRevealObserver() {
  useEffect(() => {
    const pending = () => Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      pending().forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const observeAll = () => pending().forEach((el) => io.observe(el));
    observeAll();
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => ((queued = false), observeAll()));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
