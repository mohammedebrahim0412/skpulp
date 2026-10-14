import { src, srcSet, stages } from "@/config/media";
import ProcessVideo from "./ProcessVideo";
import Leaves from "./ui/Leaves";
import { Button, Eyebrow, Reveal } from "./ui/Primitives";

function StepArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-6 text-leaf-700 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 12h15M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title">
      <div className="paper-grain relative isolate overflow-hidden py-20 md:py-28">
        <Leaves className="-bottom-8 -left-10 -z-10 hidden w-32 md:block lg:w-36" />
        <Leaves flip className="-right-10 top-10 -z-10 hidden w-36 opacity-80 lg:block" />
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow className="text-leaf-700">Our Process</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="process-title" className="mt-4 text-headline font-extrabold text-forest text-balance">
                  From Raw Material to <span className="text-leaf-600">High Strength Pulp</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140} className="lg:col-span-5">
              <p className="text-charcoal/70 lg:text-right">
                Five stages at our Latur factory turn secondary fibre into finished pulp sheets — photographed and filmed
                on our own floor.
              </p>
            </Reveal>
          </div>

          {/* Step diagram: vertical list on phones, a single row with arrows on large screens */}
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:mt-16 lg:grid-cols-5 lg:gap-10">
            {stages.map((s, i) => (
              <Reveal as="li" key={s.key} delay={i * 90} className="relative">
                <div className="flex items-center gap-5 lg:flex-col lg:text-center">
                  <div className="relative shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src(s.still, 800)}
                      srcSet={srcSet(s.still)}
                      sizes="(min-width: 1024px) 11rem, 7rem"
                      alt={s.still.alt}
                      width={s.still.width}
                      height={s.still.height}
                      loading="lazy"
                      className="size-28 rounded-full object-cover ring-4 ring-white shadow-[0_18px_36px_-20px_rgba(14,58,36,0.6)] lg:size-40"
                    />
                    <span className="absolute -left-1 -top-1 grid size-9 place-items-center rounded-full bg-leaf-700 text-sm font-extrabold text-white ring-4 ring-paper">
                      {i + 1}
                    </span>
                  </div>
                  <div className="lg:mt-5">
                    <p className="text-lg font-extrabold text-forest">{s.title}</p>
                    <p className="mt-1 text-sm font-semibold text-leaf-700">{s.caption}</p>
                    <p className="mt-2 text-sm text-charcoal/65">{s.body}</p>
                  </div>
                </div>
                {i < stages.length - 1 && (
                  <StepArrow className="absolute -right-8 top-[4.25rem] hidden lg:block" />
                )}
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-12 flex justify-center">
            <Button href="#process-video">Watch Full Process</Button>
          </Reveal>
        </div>
      </div>

      {/* Process film */}
      <div id="process-video" className="relative scroll-mt-16 bg-pine py-20 text-white md:py-28">
        <div aria-hidden className="torn-edge top text-paper" />
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow className="justify-center text-leaf">Watch Our Process</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-headline font-extrabold text-balance">Inside the SK PULP &amp; FIBRE Factory</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-white/75">
                Raw material handling, pulping, sheet formation, open-air drying and warehousing — filmed on our own floor.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200} className="mx-auto mt-10 max-w-5xl md:mt-14">
            <ProcessVideo />
          </Reveal>
        </div>
        <div aria-hidden className="torn-edge bottom text-beige" />
      </div>
    </section>
  );
}
