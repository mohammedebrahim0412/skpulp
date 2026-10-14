import { company } from "@/config/site";
import IndiaMap from "./IndiaMap";
import CountUp from "./ui/CountUp";
import Leaves from "./ui/Leaves";
import { Button, Eyebrow, Reveal } from "./ui/Primitives";

const ic = "size-8 text-leaf";
const stats = [
  {
    value: `Up to ${company.virginPulpReduction}`,
    label: "Less virgin pulp",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" className={ic} aria-hidden>
        <circle cx="16" cy="16" r="11" />
        <path d="M16 5v22A11 11 0 0 1 16 5z" fill="currentColor" fillOpacity="0.35" />
      </svg>
    ),
  },
  {
    value: company.capacity.current,
    label: "Production per month",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" className={ic} aria-hidden>
        <path d="M5 20l11 6 11-6M5 15l11 6 11-6M5 10l11-6 11 6-11 6z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "CPPRI",
    label: "Independently tested",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" className={ic} aria-hidden>
        <path d="M12 4h8M13 4v8L6 25a2 2 0 0 0 1.8 3h16.4A2 2 0 0 0 26 25l-7-13V4" strokeLinejoin="round" />
        <path d="M9.5 20h13" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "India & Saudi Arabia",
    label: "Domestic & export supply",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" className={ic} aria-hidden>
        <path d="M3 10h15v12H3zM18 14h6l4 4v4h-10z" strokeLinejoin="round" />
        <circle cx="8" cy="24" r="2.5" fill="currentColor" />
        <circle cx="23" cy="24" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section
      id="distribution"
      aria-labelledby="why-title"
      className="relative isolate overflow-hidden bg-pine py-20 text-white md:py-28"
    >
      <Leaves flip className="-right-10 bottom-8 -z-10 hidden w-40 opacity-90 md:block lg:w-52" />
      <div aria-hidden className="torn-edge top text-paper" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow className="text-leaf">Why Choose Us</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="why-title" className="mt-4 text-headline font-extrabold text-balance">
              Manufactured in Maharashtra. <span className="text-leaf">Supplying India and Beyond.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-xl text-white/75">
              From our factory in Latur district we supply reputed fibre cement manufacturers across India and export
              to Saudi Arabia. {company.capacity.expansion}.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {stats.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 80} className="flex items-start gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white/[0.07] ring-1 ring-white/10">
                  {s.icon}
                </span>
                <span>
                  <span className="block text-xl font-extrabold leading-tight tracking-[-0.02em] sm:text-2xl">
                    <CountUp value={s.value} />
                  </span>
                  <span className="mt-1 block text-sm text-white/65">{s.label}</span>
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200}>
            <Button href="#contact" variant="leaf" className="mt-10">
              Discuss Your Supply Requirements
            </Button>
          </Reveal>
        </div>

        <Reveal className="flex justify-center lg:col-span-5">
          <div className="w-full max-w-md">
            <IndiaMap />
          </div>
        </Reveal>
      </div>
      <div aria-hidden className="torn-edge bottom text-beige" />
    </section>
  );
}
