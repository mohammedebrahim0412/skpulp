import { src, srcSet, stills } from "@/config/media";
import { company } from "@/config/site";
import { Arrow } from "./ui/Primitives";

const still = stills.heroFactory;

const features = [
  {
    label: ["Up to 50%", "less virgin pulp"],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-8" aria-hidden>
        <circle cx="16" cy="16" r="11" />
        <path d="M16 5v22A11 11 0 0 1 16 5z" fill="currentColor" fillOpacity="0.35" />
      </svg>
    ),
  },
  {
    label: ["CPPRI", "tested pulp"],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-8" aria-hidden>
        <path d="M12 4h8M13 4v8L6 25a2 2 0 0 0 1.8 3h16.4A2 2 0 0 0 26 25l-7-13V4" strokeLinejoin="round" />
        <path d="M9.5 20h13" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: [company.capacity.current, company.capacity.unit],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-8" aria-hidden>
        <path d="M5 20l11 6 11-6M5 15l11 6 11-6M5 10l11-6 11 6-11 6z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative isolate overflow-hidden bg-pine pt-16 text-white md:pt-[4.75rem]"
    >
      {/* Factory photograph, faded into deep green on the left for legibility */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src(still)}
          srcSet={srcSet(still)}
          sizes="100vw"
          alt={still.alt}
          width={still.width}
          height={still.height}
          fetchPriority="high"
          className="hero-zoom h-full w-full object-cover object-[58%_center]"
        />
        {/* Phones: even wash for legibility. Larger screens: green only behind the text, true colour on the right. */}
        <div className="absolute inset-0 bg-pine/70 md:bg-transparent md:bg-[linear-gradient(90deg,rgba(14,58,36,0.94)_0%,rgba(14,58,36,0.78)_34%,rgba(14,58,36,0.2)_62%,rgba(14,58,36,0)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine/60 via-transparent to-transparent" />
      </div>

      <div className="container-x relative pb-24 pt-16 md:pb-32 md:pt-24 lg:min-h-[min(46rem,82svh)] lg:pt-28">
        <div className="max-w-2xl">
          <p className="hero-in eyebrow text-leaf" style={{ animationDelay: "100ms" }}>
            High Strength Secondary Wood Pulp
          </p>
          <h1
            className="hero-in mt-5 text-[clamp(2.4rem,6.4vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
            style={{ animationDelay: "200ms" }}
          >
            Built for
            <span className="block text-leaf">Fibre Cement.</span>
          </h1>
          <p className="hero-in mt-6 max-w-lg text-lede text-white/85" style={{ animationDelay: "320ms" }}>
            Secondary wood pulp sheets that replace up to 50% of virgin pulp — with almost identical technical
            parameters, at an affordable price.
          </p>

          <ul
            className="hero-in mt-9 grid max-w-xl grid-cols-3 divide-x divide-white/15"
            style={{ animationDelay: "440ms" }}
          >
            {features.map((f) => (
              <li key={f.label[0]} className="flex flex-col items-start gap-2.5 px-3 first:pl-0 sm:px-6">
                <span className="text-leaf">{f.icon}</span>
                <span className="text-[0.82rem] font-semibold leading-snug sm:text-sm">
                  {f.label[0]}
                  <span className="block font-medium text-white/70">{f.label[1]}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="hero-in mt-10 flex flex-col gap-3 min-[420px]:flex-row" style={{ animationDelay: "560ms" }}>
            <a
              href="#products"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-leaf px-6 font-bold text-pine transition-colors hover:bg-[#8fce5f]"
            >
              Our Products <Arrow />
            </a>
            <a
              href="#process-video"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-white/40 px-6 font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <circle cx="10" cy="10" r="8.2" />
                <path d="M8.3 6.9v6.2l5-3.1z" fill="currentColor" stroke="none" />
              </svg>
              Watch Our Process
            </a>
          </div>
        </div>

        <div
          className="hero-in absolute bottom-16 right-0 hidden items-center gap-4 rounded-l-lg bg-pine/90 py-4 pl-5 pr-8 lg:flex"
          style={{ animationDelay: "700ms" }}
        >
          <svg viewBox="0 0 32 32" className="size-9 text-leaf" fill="currentColor" aria-hidden>
            <path d="M27 5C14 5 6 11 6 21c0 2 .4 3.8 1 5.2C9 19 14 14 21 11c-6 4-10 9-11.6 16.4.9.4 1.9.6 3 .6C22 28 27 19 27 5z" />
          </svg>
          <p className="text-sm font-semibold leading-snug">
            Trusted by fibre cement leaders
            <span className="block font-medium text-white/70">India &amp; Saudi Arabia</span>
          </p>
        </div>
      </div>

      <div aria-hidden className="torn-edge bottom text-paper" />

      <style>{`
        @keyframes hero-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .hero-in { animation: hero-in 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes hero-zoom { from { transform: scale(1.08); } to { transform: scale(1); } }
        .hero-zoom { animation: hero-zoom 2.6s cubic-bezier(0.22,1,0.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .hero-in, .hero-zoom { animation: none; } }
      `}</style>
    </section>
  );
}
