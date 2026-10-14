import { portraitPhoto, stills } from "@/config/media";
import { company } from "@/config/site";
import { Button, Eyebrow, Reveal, StillImage } from "./ui/Primitives";

const ic = "size-9 text-leaf-700";
const points = [
  {
    label: "Made for Fibre Cement",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" className={ic} aria-hidden>
        <rect x="5" y="9" width="26" height="5" rx="1" />
        <rect x="5" y="16" width="26" height="5" rx="1" />
        <rect x="5" y="23" width="26" height="5" rx="1" />
      </svg>
    ),
  },
  {
    label: "Lab-Tested Strength",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" className={ic} aria-hidden>
        <path d="M14 5h8M15 5v9L8 27a2 2 0 0 0 1.8 3h16.4A2 2 0 0 0 28 27l-7-13V5" strokeLinejoin="round" />
        <path d="M11.5 22h13" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Affordable Alternative",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" className={ic} aria-hidden>
        <circle cx="18" cy="18" r="12" />
        <path d="M18 6v24A12 12 0 0 1 18 6z" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
  },
  {
    label: "India & Export Supply",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" className={ic} aria-hidden>
        <circle cx="18" cy="18" r="12" />
        <path d="M6 18h24M18 6c4 4 4 20 0 24M18 6c-4 4-4 20 0 24" />
      </svg>
    ),
  },
];

export default function Intro() {
  const person = company.contactPerson;
  return (
    <section id="about" aria-labelledby="about-title" className="paper-grain relative py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow className="text-leaf-700">About Us</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="about-title" className="mt-4 text-headline font-extrabold text-forest text-balance">
              SK PULP <span className="text-leaf-600">&amp;</span> FIBRE
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-lede text-charcoal/80 text-pretty">
              An emerging supplier of high strength secondary wood pulp used in the production of fibre cement sheets
              and boards — for the domestic as well as the international market.
            </p>
            <p className="mt-4 max-w-xl text-charcoal/70 text-pretty">
              Our pulp increases flexibility, strength and better handling of the finished product while lowering the
              overall consumption of virgin pulp. Reduce virgin pulp by up to 50% and achieve almost identical
              technical parameters — at an affordable price.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {points.map((p) => (
                <li key={p.label} className="flex flex-col items-start gap-3 sm:items-center sm:text-center">
                  {p.icon}
                  <span className="text-sm font-bold leading-snug text-charcoal">{p.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={260}>
            <Button href="#company" className="mt-10">
              Know More About Us
            </Button>
          </Reveal>
        </div>

        <Reveal className="relative lg:col-span-6">
          <StillImage
            still={stills.aboutMachine}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="aspect-[4/3] rounded-lg"
            imgClassName="object-[38%_center]"
          />
          <div className="relative -mt-12 ml-auto mr-4 w-[min(20rem,88%)] rounded-lg bg-pine p-5 text-white shadow-[0_24px_50px_-24px_rgba(14,58,36,0.6)] sm:mr-6 lg:absolute lg:-bottom-8 lg:right-6 lg:mt-0">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portraitPhoto ? `${portraitPhoto.base}-600.jpg` : "/brand/logo-mark-128.png"}
                alt=""
                width={portraitPhoto ? 600 : 128}
                height={portraitPhoto ? 720 : 128}
                loading="lazy"
                className={`size-11 rounded-full ring-2 ring-leaf/60 ${
                  portraitPhoto ? "object-cover object-top" : "bg-paper object-contain p-0.5"
                }`}
              />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-leaf">{person.title}</p>
                <p className="mt-0.5 font-bold">{person.name}</p>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 border-t border-white/15 pt-4 text-sm text-white/80">
              <svg viewBox="0 0 20 20" className="size-4 shrink-0 text-leaf" fill="currentColor" aria-hidden>
                <path d="M10 1.5a6 6 0 0 0-6 6c0 4.4 6 11 6 11s6-6.6 6-11a6 6 0 0 0-6-6zm0 8.2a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4z" />
              </svg>
              {company.location.full}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
