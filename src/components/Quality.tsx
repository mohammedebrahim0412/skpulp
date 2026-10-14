import type { CSSProperties } from "react";
import { testReport as r } from "@/config/site";
import CountUp from "./ui/CountUp";
import { Eyebrow, Reveal } from "./ui/Primitives";

export default function Quality() {
  const longest = r.fibreLength[0];

  return (
    <section id="quality" aria-labelledby="quality-title" className="paper-grain-beige py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow className="text-leaf-700">Quality &amp; Test Report</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="quality-title" className="mt-4 text-headline font-extrabold text-forest text-balance">
                Independently Tested. Measurably Strong.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5">
            <p className="text-lede text-charcoal/75">
              Our High Strength Pulp Sheet (WKP) was tested at the {r.lab} — {r.labNote.charAt(0).toLowerCase() + r.labNote.slice(1)}.
            </p>
          </Reveal>
        </div>

        {/* Headline figures */}
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-charcoal/15 bg-charcoal/15 md:mt-20 lg:grid-cols-4">
          {r.highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 90} className="flex flex-col-reverse bg-beige p-5 md:p-8">
              <dt className="mt-3 text-sm font-medium leading-snug text-charcoal/70">{h.label}</dt>
              <dd className="flex items-baseline gap-1.5">
                <span className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold leading-none tracking-[-0.05em] text-charcoal">
                  <CountUp value={h.value} />
                </span>
                {h.unit && <span className="text-base font-bold text-steel md:text-lg">{h.unit}</span>}
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Fibre length distribution + full table (min-w-0 lets the table scroll instead of widening the page) */}
          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <h3 className="text-xl font-bold tracking-[-0.02em]">Fibre length distribution</h3>
              <p className="mt-2 text-charcoal/65">
                {longest.pct.toFixed(2)}% of fibres measured {longest.range.replace("≥ ", "")} or longer — a weighted
                average fibre length of 2.3 mm.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-8 space-y-3.5" aria-label="Fibre length distribution, percent">
                {r.fibreLength.map((f, i) => (
                  <li key={f.range} className="grid grid-cols-[6.5rem_1fr_3.5rem] items-center gap-3 text-sm sm:grid-cols-[7.5rem_1fr_4rem]">
                    <span className="font-medium text-charcoal/70">{f.range}</span>
                    <span className="relative h-2.5 overflow-hidden rounded-full bg-charcoal/10">
                      <span
                        data-reveal
                        className="bar absolute inset-y-0 left-0 rounded-full bg-leaf-600"
                        style={{ "--w": `${f.pct}%`, "--reveal-delay": `${200 + i * 90}ms` } as CSSProperties}
                      />
                    </span>
                    <span className="text-right font-semibold tabular-nums">{f.pct.toFixed(2)}%</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="mt-14">
              <h3 className="text-xl font-bold tracking-[-0.02em]">All test results</h3>
              <div className="mt-6 overflow-x-auto rounded-lg border border-charcoal/15 bg-paper/60">
                <table className="w-full min-w-[22rem] text-left text-sm">
                  <caption className="sr-only">
                    CPPRI test results for {r.sample}
                  </caption>
                  <thead>
                    <tr className="border-b border-charcoal/15 text-[0.7rem] uppercase tracking-[0.14em] text-steel">
                      <th scope="col" className="px-4 py-3 font-semibold md:px-5">Parameter</th>
                      <th scope="col" className="px-4 py-3 font-semibold md:px-5">Unit</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold md:px-5">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.results.map((row) => (
                      <tr key={row.parameter} className="border-b border-charcoal/10 last:border-0">
                        <th scope="row" className="px-4 py-3 font-medium md:px-5">{row.parameter}</th>
                        <td className="px-4 py-3 text-steel md:px-5">{row.unit}</td>
                        <td className="px-4 py-3 text-right font-bold tabular-nums md:px-5">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-charcoal/55">{r.footnote}</p>
            </Reveal>
          </div>

          {/* The report itself */}
          <Reveal mode="mask" className="lg:col-span-5">
            <figure className="lg:sticky lg:top-28">
              <a
                href={r.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-sm bg-white shadow-[0_30px_60px_-30px_rgba(23,27,25,0.45)] ring-1 ring-charcoal/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/reports/cppri-test-report-2025-preview.jpg"
                  alt={`CPPRI test report ${r.reference} dated ${r.date} for ${r.sample}`}
                  width={900}
                  height={1164}
                  loading="lazy"
                  className="w-full transition-transform duration-[1200ms] ease-cine group-hover:scale-[1.02]"
                />
              </a>
              <figcaption className="mt-5">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-steel">Reference</dt>
                    <dd className="mt-1 font-semibold">{r.reference}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-steel">Date</dt>
                    <dd className="mt-1 font-semibold">{r.date}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-steel">Sample submitted by</dt>
                    <dd className="mt-1 font-semibold">{r.submittedBy}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={r.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-leaf-700 px-6 font-bold text-white transition-colors hover:bg-forest"
                  >
                    View Report (PDF)
                  </a>
                  <a
                    href={r.pdf}
                    download="SK-Pulp-Fibre-CPPRI-Test-Report.pdf"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-charcoal/25 px-6 font-bold transition-colors hover:border-charcoal"
                  >
                    Download
                  </a>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
      <style>{`
        .bar { width: var(--w); }
        .js .bar[data-reveal] { opacity: 1; transform: none; width: 0; transition: width 1.4s var(--ease-cine) var(--reveal-delay, 0ms); }
        .js .bar[data-reveal].is-in { width: var(--w); }
        @media (prefers-reduced-motion: reduce) { .js .bar[data-reveal] { width: var(--w) !important; transition: none !important; } }
      `}</style>
    </section>
  );
}
