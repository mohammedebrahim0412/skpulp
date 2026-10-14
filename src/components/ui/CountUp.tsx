"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts the first number in `value` up from zero when it scrolls into view
 * ("Up to 50%", "1,000 MT", "8.2"). Text without a number renders as-is. The final value
 * is server-rendered, so it is correct without JavaScript and for reduced-motion visitors.
 */
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(/\d[\d,]*(\.\d+)?/);
  const [text, setText] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!match || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const raw = match[0];
    const target = parseFloat(raw.replace(/,/g, ""));
    const decimals = match[1] ? match[1].length - 1 : 0;
    const grouped = raw.includes(",");
    const fmt = (n: number) =>
      grouped
        ? n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals);
    const render = (n: number) => setText(value.replace(raw, fmt(n)));

    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          render(target * (1 - Math.pow(1 - t, 3)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        render(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}
