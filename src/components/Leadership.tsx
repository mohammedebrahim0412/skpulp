import { portraitPhoto as portrait } from "@/config/media";
import { company } from "@/config/site";
import { Eyebrow, Reveal } from "./ui/Primitives";

export default function Leadership() {
  const person = company.contactPerson;
  return (
    <section id="company" aria-labelledby="company-title" className="paper-grain-beige py-24 md:py-36">
      <div className="container-x grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <Reveal mode="mask" className="md:col-span-5">
          <div className={`relative aspect-[4/5] overflow-hidden rounded-sm ${portrait ? "bg-charcoal" : "bg-paper"}`}>
            {portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${portrait.base}-1000.jpg`}
                srcSet={`${portrait.base}-600.jpg 600w, ${portrait.base}-1000.jpg 1000w`}
                sizes="(min-width: 768px) 40vw, 100vw"
                alt={`${person.name}, ${person.title} at ${company.name}`}
                width={portrait.width}
                height={portrait.height}
                loading="lazy"
                className="h-full w-full object-cover object-[50%_25%]"
              />
            ) : (
              <div className="grid h-full place-items-center p-10 md:p-14">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/logo-full.png"
                  alt={`${company.name} logo`}
                  width={1145}
                  height={719}
                  loading="lazy"
                  className="w-full max-w-sm object-contain"
                />
              </div>
            )}
          </div>
        </Reveal>

        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow className="text-leaf-700">Company</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="company-title" className="mt-4 text-headline font-extrabold text-forest text-balance">
              Built on Manufacturing. Focused on Quality.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 text-lede text-charcoal/75">
              SK PULP &amp; FIBRE is focused on supplying high strength secondary wood pulp to fibre cement
              manufacturers through manufacturing-led operations and a commitment to dependable business
              relationships.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex items-center gap-5 border-t border-charcoal/15 pt-7">
              <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-paper ring-1 ring-charcoal/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo-mark-128.png" alt="" width={128} height={128} className="size-[92%] object-contain" />
              </span>
              <div>
                <p className="text-lg font-bold tracking-[-0.01em]">{person.name}</p>
                <p className="text-sm text-steel">
                  {person.title}, {company.name}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
