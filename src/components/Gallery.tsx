"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { src, srcSet, stills, type Still } from "@/config/media";
import { Eyebrow, Reveal } from "./ui/Primitives";

const photos: { still: Still; title: string; className: string }[] = [
  { still: stills.warehouseWide, title: "The factory shed", className: "col-span-2 row-span-2" },
  { still: stills.loaderTipping, title: "Raw material yard", className: "" },
  { still: stills.loaderFeeding, title: "Feeding the pulper", className: "row-span-2" },
  { still: stills.pulpers, title: "Pulper line", className: "" },
  { still: stills.machineDetail, title: "Pulp sheet machine", className: "col-span-2" },
  { still: stills.machineFloor, title: "Machine floor", className: "col-span-2" },
  { still: stills.dryingField, title: "Drying yard", className: "col-span-2" },
  { still: stills.warehouseStacks, title: "Finished stock", className: "col-span-2" },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const show = (i: number) => {
    setOpen(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = open === null ? null : photos[open];

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow className="text-leaf-700">Gallery</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="gallery-title" className="mt-4 text-headline font-extrabold text-forest text-balance">
                Built Around the Manufacturing Process
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="lg:col-span-5">
            <p className="text-charcoal/70 lg:text-right">
              Real photographs from our facility in Latur district — the equipment, material flow and people behind
              every pulp sheet.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-flow-dense auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[14rem]">
          {photos.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 4) * 70} className={p.className}>
              <button
                type="button"
                onClick={() => show(i)}
                aria-label={`View photo: ${p.title}`}
                className="group relative block h-full w-full overflow-hidden rounded-lg bg-paper"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src(p.still, 800)}
                  srcSet={srcSet(p.still)}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  alt={p.still.alt}
                  width={p.still.width}
                  height={p.still.height}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-cine group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pine/85 to-transparent px-3 pb-3 pt-10 text-left text-sm font-bold text-white md:px-4">
                  {p.title}
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && close()}
        aria-label={current?.title ?? "Photo"}
        className="m-auto max-h-[92svh] w-[min(72rem,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-black/85"
      >
        {current && (
          <figure className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src(current.still)}
              alt={current.still.alt}
              width={current.still.width}
              height={current.still.height}
              className="max-h-[80svh] w-full rounded-lg object-contain"
            />
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-white">
              <span className="font-bold">{current.title}</span>
              <span className="text-sm text-white/60">
                {open! + 1} / {photos.length}
              </span>
            </figcaption>
            <div className="absolute -top-14 right-0 flex gap-2">
              {[
                { label: "Previous photo", d: -1, path: "M15 5l-7 7 7 7" },
                { label: "Next photo", d: 1, path: "M9 5l7 7-7 7" },
              ].map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => step(b.d)}
                  aria-label={b.label}
                  className="grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d={b.path} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid size-11 place-items-center rounded-full bg-white text-pine hover:bg-leaf"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </section>
  );
}
