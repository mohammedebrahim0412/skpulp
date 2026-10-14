import { clients } from "@/config/site";
import { Eyebrow, Reveal } from "./ui/Primitives";

export default function Clients() {
  const countries = Array.from(new Set(clients.map((c) => c.country)));

  return (
    <section id="clients" aria-labelledby="clients-title" className="paper-grain py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow className="text-leaf-700">Our Clientele</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="clients-title" className="mt-4 text-headline font-extrabold text-forest text-balance">
                Trusted by Fibre Cement Leaders.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5">
            <p className="text-lede text-charcoal/70">
              We supply reputed fibre cement sheet and board manufacturers in India and Saudi Arabia.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 space-y-12 md:mt-20">
          {countries.map((country) => (
            <div key={country}>
              <Reveal>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-steel">{country}</p>
              </Reveal>
              <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {clients
                  .filter((c) => c.country === country)
                  .map((c, i) => (
                    <Reveal as="li" key={c.name} delay={i * 80}>
                      <figure
                        className={`group flex h-full flex-col overflow-hidden rounded-lg border border-charcoal/10 transition-shadow duration-500 hover:shadow-[0_20px_40px_-24px_rgba(23,27,25,0.35)] ${
                          c.dark ? "bg-black" : "bg-white"
                        }`}
                      >
                        <div className="relative h-28 sm:h-32 md:h-36">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={c.logo}
                            alt={`${c.name} logo`}
                            width={c.width}
                            height={c.height}
                            loading="lazy"
                            className="absolute inset-0 m-auto max-h-[72%] max-w-[78%] object-contain transition-transform duration-700 ease-cine group-hover:scale-[1.04]"
                          />
                        </div>
                        <figcaption
                          className={`border-t px-4 py-3 text-[0.82rem] font-semibold leading-snug ${
                            c.dark ? "border-white/10 bg-charcoal text-paper" : "border-charcoal/10 bg-paper text-charcoal"
                          }`}
                        >
                          {c.name}
                        </figcaption>
                      </figure>
                    </Reveal>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
