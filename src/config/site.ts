/**
 * Single source of truth for company facts shown on the site.
 *
 * Only verified information belongs here. Anything left as `null` is hidden
 * (or shown as "Shared on request") rather than guessed — do not fill a field
 * until the company has confirmed the value.
 */

const env = (v: string | undefined) => (v && v.trim() ? v.trim() : null);

export const company = {
  name: "SK PULP & FIBRE",
  tagline: "High Strength Secondary Wood Pulp",
  /** One-line positioning used in hero, meta and footer */
  positioning: "High strength secondary wood pulp for fibre cement sheets and boards",
  contactPerson: { name: "Kiyamudin", title: "Marketing Head" },
  location: {
    short: "Latur, Maharashtra",
    full: "Latur district, Maharashtra, India",
    /** Approximate district coordinates, used only for the distribution map marker. */
    lat: 18.4,
    lon: 76.56,
  },
  distribution: "Supplying India and international markets",
  /** Company-stated figures (provided by SK PULP & FIBRE) */
  capacity: { current: "1,000 MT", unit: "per month", expansion: "Further 1,000 MT per month expansion planned" },
  virginPulpReduction: "50%",
  markets: ["India", "Saudi Arabia"],

  // ---- Not yet provided: keep null until verified ----
  foundedYear: null as number | null,
  /** Full postal address of the factory, e.g. "Plot 12, MIDC, Latur, Maharashtra 413531" */
  address: null as string | null,
} as const;

export const contact = {
  /** E.164 format. NEXT_PUBLIC_CONTACT_PHONE (comma-separated) overrides these. */
  phones: env(process.env.NEXT_PUBLIC_CONTACT_PHONE)?.split(",").map((p) => p.trim()) ?? ["+917010381314", "+918808084949"],
  /** Digits only with country code. NEXT_PUBLIC_CONTACT_WHATSAPP overrides. */
  whatsapp: env(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP) ?? "917010381314",
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "skpulp@gmail.com",
};


/**
 * Absolute site address, used for canonical links, share previews, the sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL before deploying. On Vercel, the project's production domain is used
 * automatically; otherwise a production build warns instead of silently publishing localhost URLs.
 */
const vercelUrl = env(process.env.VERCEL_PROJECT_PRODUCTION_URL);
export const siteUrl = (
  env(process.env.NEXT_PUBLIC_SITE_URL) ??
  (vercelUrl ? `https://${vercelUrl}` : null) ??
  "http://localhost:3000"
).replace(/\/+$/, "");

if (process.env.NODE_ENV === "production" && siteUrl.includes("localhost")) {
  console.warn(
    "\n⚠  NEXT_PUBLIC_SITE_URL is not set: canonical links, share previews and the sitemap will point to " +
      `${siteUrl}. Set it to the live address (e.g. https://www.example.com) before deploying.\n`,
  );
}

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Our Process", href: "#process" },
  { label: "Quality", href: "#quality" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Product information. Every spec is `null` until supplied and verified by
 * SK PULP & FIBRE — null values are not displayed as figures.
 */
export const product = {
  name: "High Strength Pulp Sheet (WKP)",
  summary:
    "Secondary wood pulp sheets for the production of fibre cement sheets and boards — a cost-effective replacement for virgin pulp.",
  benefits: [
    { title: "Flexibility", body: "Adds flexibility to the finished fibre cement product." },
    { title: "Strength", body: "Contributes to the strength of sheets and boards." },
    { title: "Better handling", body: "Improves handling of the finished product." },
    { title: "Lower virgin pulp use", body: "Replace up to 50% of virgin pulp with almost identical technical parameters." },
  ],
  specs: [
    { label: "Sheet dimensions", value: null as string | null },
    { label: "Thickness", value: null as string | null },
    { label: "Weight / GSM", value: null as string | null },
    { label: "Moisture", value: null as string | null },
    { label: "Packaging", value: null as string | null },
    { label: "Minimum order quantity", value: null as string | null },
  ],
};

/** Clients named by SK PULP & FIBRE. Logos in public/logos/. */
export const clients = [
  { name: "Everest Industries Limited", logo: "/logos/everest.png", width: 447, height: 448, country: "India" },
  { name: "HIL Limited (BirlaNu)", logo: "/logos/hil.png", width: 480, height: 320, country: "India" },
  { name: "Jolly Board Limited", logo: "/logos/jolly-board.png", width: 208, height: 142, country: "India" },
  { name: "Sahyadri Industries Limited", logo: "/logos/sahyadri-v2.png", width: 200, height: 53, country: "India" },
  { name: "ACFA", logo: "/logos/acfa.png", width: 480, height: 192, country: "Saudi Arabia", dark: true },
  { name: "United Mining Industries", logo: "/logos/united-mining.png", width: 271, height: 78, country: "Saudi Arabia" },
] as { name: string; logo: string; width: number; height: number; country: string; dark?: boolean }[];

/** CPPRI test report — values transcribed from the signed report in public/reports/. */
export const testReport = {
  lab: "Central Pulp & Paper Research Institute (CPPRI), Saharanpur",
  labShort: "CPPRI Saharanpur",
  labNote: "An autonomous organisation under the Ministry of Commerce & Industry, Govt. of India",
  reference: "CPPRI/SPPM/2025-26/R-34",
  date: "28 August 2025",
  sample: "High Strength Pulp Sheet, WKP (SK Pulp and Fibre)",
  submittedBy: "Jolly Board Limited, Aurangabad",
  pdf: "/reports/cppri-test-report-2025.pdf",
  highlights: [
    { value: "8.2", unit: "km", label: "Zero span tensile (dry)" },
    { value: "6.47", unit: "km", label: "Zero span tensile (wet)" },
    { value: "24.49", unit: "", label: "Burst factor" },
    { value: "2.3", unit: "mm", label: "Weighted avg. fibre length" },
  ],
  results: [
    { parameter: "Ash", unit: "%", value: "3.04" },
    { parameter: "Alkali solubility (1% NaOH)", unit: "%", value: "4.47" },
    { parameter: "Freeness*", unit: "°SR", value: "17.5" },
    { parameter: "pH", unit: "—", value: "8.1" },
    { parameter: "Zero span tensile strength (dry)", unit: "km", value: "8.2" },
    { parameter: "Zero span tensile strength (wet)", unit: "km", value: "6.47" },
    { parameter: "Kappa no.", unit: "—", value: "49.9" },
    { parameter: "Burst factor", unit: "—", value: "24.49" },
    { parameter: "Weighted average fibre length", unit: "mm", value: "2.3" },
    { parameter: "WRV", unit: "%", value: "136.2" },
  ],
  fibreLength: [
    { range: "≥ 2.8 mm", pct: 63.11 },
    { range: "2.8–1.8 mm", pct: 14.88 },
    { range: "1.8–1.2 mm", pct: 9.18 },
    { range: "1.2–0.7 mm", pct: 2.68 },
    { range: "< 0.7 mm", pct: 10.15 },
  ],
  footnote: "*Freeness of pulp was determined in CSF, ml and reported as equivalent °SR.",
};

export const formatPhone = (e164: string) =>
  e164.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2");
