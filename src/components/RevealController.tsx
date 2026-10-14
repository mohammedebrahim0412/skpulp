"use client";

import { useRevealObserver } from "@/lib/hooks";

/** Drives every [data-reveal] scroll animation on the page with one IntersectionObserver. */
export default function RevealController() {
  useRevealObserver();
  return null;
}
