import { stills } from "@/config/media";
import { product, testReport } from "@/config/site";
import Leaves from "./ui/Leaves";
import { Button, Eyebrow, Reveal, StillImage } from "./ui/Primitives";

const ic = "size-8 text-leaf-700";
const benefitIcons = [
  <svg key="flex" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" className={ic} aria-hidden>
    <path d="M4 22c6 0 6-12 12-12s6 12 12 12" strokeLinecap="round" />
  </svg>,
  <svg key="strength" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" className={ic} aria-hidden>
    <path d="M16 4l10 4v7c0 7-4.5 11-10 13C10.5 26 6 22 6 15V8z" strokeLinejoin="round" />
    <path d="M11.5 16l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="handling" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" className={ic} aria-hidden>
    <rect x="5" y="9" width="22" height="5" rx="1" />
    <rect x="5" y="16" width="22" height="5" rx="1" />
    <path d="M8 24h16" strokeLinecap="round" />
  </svg>,
  <svg key="virgin" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" className={ic} aria-hidden>
    <circle cx="16" cy="16" r="11" />
    <path d="M16 5v22A11 11 0 0 1 16 5z" fill="currentColor" fillOpacity="0.2" />
  </svg>,
];

export default function Products() {
  const known = product.specs.filter((s) => s.value);
  const pending = product.specs.filter((s) => !s.value);

  return (
    <section id="products" aria-labelledby="products-title">
      {/* Feature band */}
      <div className="relative isolate overflow-hidden bg-pine text-white">
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-5">
            <Reveal>
              <Eyebrow className="text-leaf">Our Product</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="products-title" className="mt-4 text-headline font-extrabold text-balance">
                {product.name}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-md text-lede text-white/80">
                Strong. Reliable. Affordable. Secondary wood pulp sheets made for fibre cement sheet and board
                production — the best-suited replacement for virgin pulp.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <Button href="#contact" variant="leaf">
                Enquire Now
              </Button>
              <Button href="#quality" variant="ghost-dark">
                View Test Report
              </Button>
            </Reveal>
          </div>
          <Reveal className="relative lg:col-span-7">
            <Leaves className="-bottom-6 -left-6 z-10 w-28 sm:w-36 lg:-left-4 lg:w-32 xl:-left-14 xl:w-44" />
            <StillImage
              still={stills.detailSheetEdges}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[16/10] rounded-lg lg:-mr-[max(4rem,calc((100vw-92rem)/2+4rem))] lg:rounded-r-none"
            />
          </Reveal>
        </div>
        <div aria-hidden className="torn-edge bottom text-paper" />
      </div>

      {/* Benefits + product card */}
      <div className="paper-grain py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <h3 className="max-w-2xl text-title font-extrabold text-forest text-balance">
              What our pulp brings to your finished product
            </h3>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.benefits.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 80}>
                <div className="group flex h-full flex-col rounded-lg border border-charcoal/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-leaf-600/40 hover:shadow-[0_20px_40px_-28px_rgba(14,58,36,0.5)]">
                  <span className="grid size-14 place-items-center rounded-full bg-leaf/15">{benefitIcons[i]}</span>
                  <p className="mt-5 text-lg font-bold text-forest">{b.title}</p>
                  <p className="mt-2 text-sm text-charcoal/65">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10">
            <div className="grid overflow-hidden rounded-lg border border-charcoal/10 bg-white md:grid-cols-12">
              <div className="p-6 md:col-span-5 md:p-9">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-leaf-700">Product</p>
                <h3 className="mt-2 text-xl font-extrabold text-forest md:text-2xl">{product.name}</h3>
                <p className="mt-3 text-charcoal/70">{product.summary}</p>
              </div>
              <div className="border-t border-charcoal/10 p-6 md:col-span-7 md:border-l md:border-t-0 md:p-9">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-leaf-700">
                  Tested at {testReport.labShort}
                </p>
                <dl className="mt-2 grid gap-x-8 sm:grid-cols-2">
                  {[...testReport.highlights, ...known.map((k) => ({ label: k.label, value: k.value!, unit: "" }))].map(
                    (h) => (
                      <div key={h.label} className="flex items-baseline justify-between gap-4 border-b border-charcoal/10 py-3">
                        <dt className="text-sm text-steel">{h.label}</dt>
                        <dd className="text-right text-sm font-bold tabular-nums text-forest">
                          {h.value} {h.unit}
                        </dd>
                      </div>
                    ),
                  )}
                </dl>
                {pending.length > 0 && (
                  <p className="mt-4 text-sm text-charcoal/60">
                    {pending.map((p) => p.label).join(", ")} — shared on enquiry.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
