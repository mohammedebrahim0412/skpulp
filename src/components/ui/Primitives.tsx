import type { CSSProperties, ReactNode } from "react";
import { type Still, src, srcSet } from "@/config/media";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "leaf" | "light" | "ghost-dark" | "ghost-light";
  className?: string;
  external?: boolean;
};

const variants = {
  primary: "bg-leaf-700 text-white hover:bg-forest",
  leaf: "bg-leaf text-pine hover:bg-[#8fce5f]",
  light: "bg-paper text-charcoal hover:bg-white",
  "ghost-dark": "border border-white/30 text-paper hover:border-white hover:bg-white/5",
  "ghost-light": "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal/[0.03]",
};

export function Button({ href, children, variant = "primary", className = "", external }: ButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-md px-6 text-[0.95rem] font-bold tracking-[-0.01em] transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
      <Arrow />
    </a>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`size-4 shrink-0 transition-transform duration-300 ease-cine group-hover:translate-x-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/** Wraps content in a scroll reveal. Content renders visible without JS. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  mode,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "figure" | "p" | "h2" | "span";
  mode?: "mask";
  className?: string;
}) {
  return (
    <Tag
      data-reveal={mode ?? ""}
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Small tag marking demonstration imagery so it is never mistaken for factory photography. */
export function IllustrativeTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-10 rounded-full bg-black/45 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-[2px] ${className}`}
    >
      Illustrative
    </span>
  );
}

export function StillImage({
  still,
  sizes,
  className = "",
  priority = false,
  tagPosition = "right-3 top-3",
  imgClassName = "",
}: {
  still: Still;
  sizes: string;
  className?: string;
  priority?: boolean;
  tagPosition?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized responsive JPGs from the media pipeline */}
      <img
        src={src(still)}
        srcSet={srcSet(still)}
        sizes={sizes}
        alt={still.alt}
        width={still.width}
        height={still.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
      {still.illustrative && <IllustrativeTag className={tagPosition} />}
    </div>
  );
}
