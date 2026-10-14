import type { ReactNode } from "react";
import { company, contact, formatPhone } from "@/config/site";
import Leaves from "./ui/Leaves";
import { Arrow, Eyebrow, Reveal } from "./ui/Primitives";

const ic = "size-6";

type Card = { label: string; icon: ReactNode; lines: { text: string; href?: string; external?: boolean }[]; cta?: { text: string; href: string; external?: boolean } };

export default function Contact() {
  const waText = encodeURIComponent(`Hello ${company.name}, I'd like to enquire about your high strength pulp sheets.`);
  const waHref = contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${waText}` : null;

  const cards: Card[] = [
    {
      label: "Call Us",
      icon: (
        <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" strokeLinejoin="round" />
        </svg>
      ),
      lines: contact.phones.map((p) => ({ text: formatPhone(p), href: `tel:${p}` })),
    },
    ...(waHref
      ? [
          {
            label: "WhatsApp",
            icon: (
              <svg viewBox="0 0 24 24" className={ic} fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
              </svg>
            ),
            lines: [{ text: formatPhone(`+${contact.whatsapp}`) }],
            cta: { text: "Chat on WhatsApp", href: waHref, external: true },
          } as Card,
        ]
      : []),
    ...(contact.email
      ? [
          {
            label: "Email Us",
            icon: (
              <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3.5 6.5l8.5 6.5 8.5-6.5" strokeLinejoin="round" />
              </svg>
            ),
            lines: [{ text: contact.email, href: `mailto:${contact.email}` }],
          } as Card,
        ]
      : []),
    {
      label: "Factory",
      icon: (
        <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M12 2.5a7 7 0 0 0-7 7c0 5.2 7 12 7 12s7-6.8 7-12a7 7 0 0 0-7-7z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      ),
      lines: [{ text: company.address ?? company.location.full }],
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="paper-grain relative isolate overflow-hidden pb-[calc(5rem+env(safe-area-inset-bottom))] pt-20 md:pb-28 md:pt-28"
    >
      <Leaves className="-bottom-6 -left-10 -z-10 hidden w-36 md:block lg:w-40" />
      <Leaves flip className="-bottom-8 -right-8 -z-10 hidden w-36 lg:block" />

      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center text-leaf-700">Get in Touch</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="contact-title" className="mt-4 text-headline font-extrabold text-forest text-balance">
              Let&rsquo;s Discuss Your <span className="text-leaf-600">Pulp Requirements</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-lede text-charcoal/70">
              Looking to lower your virgin pulp consumption? Call, WhatsApp or email us to discuss samples, quantities
              and supply for your fibre cement production.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal as="li" key={c.label} delay={i * 80}>
              <div className="flex h-full flex-col rounded-xl border border-charcoal/10 bg-white p-6 shadow-[0_24px_48px_-36px_rgba(14,58,36,0.45)] transition-transform duration-500 ease-cine hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-full bg-leaf/15 text-leaf-700">{c.icon}</span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-leaf-700">{c.label}</p>
                <div className="mt-2 space-y-1">
                  {c.lines.map((l) =>
                    l.href ? (
                      <a
                        key={l.text}
                        href={l.href}
                        className="block break-words text-lg font-bold text-forest transition-colors hover:text-leaf-700"
                      >
                        {l.text}
                      </a>
                    ) : (
                      <p key={l.text} className="text-lg font-bold text-forest">
                        {l.text}
                      </p>
                    ),
                  )}
                </div>
                {c.cta && (
                  <a
                    href={c.cta.href}
                    {...(c.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 text-sm font-bold text-ink transition-opacity hover:opacity-90"
                  >
                    {c.cta.text} <Arrow className="size-3.5" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
