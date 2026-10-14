import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { LeafGradients } from "@/components/ui/Leaves";
import { company, contact, siteUrl } from "@/config/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const title = "SK PULP & FIBRE | High Strength Secondary Wood Pulp for Fibre Cement";
const description =
  "SK PULP & FIBRE supplies high strength secondary wood pulp sheets for fibre cement sheets and boards — replace up to 50% of virgin pulp. CPPRI tested. 1,000 MT/month capacity in Latur, Maharashtra.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: company.name,
  keywords: [
    "secondary wood pulp",
    "high strength pulp sheet",
    "fibre cement pulp",
    "virgin pulp replacement",
    "WKP pulp",
    "fibre cement sheets and boards",
    "Latur",
    "Maharashtra",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.name,
    title,
    description,
    url: "/",
    images: [{ url: "/media/hero-floor-1600.jpg", width: 1600, height: 900, alt: "SK PULP & FIBRE factory floor, Latur" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/media/hero-floor-1600.jpg"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#171b19",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  description,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-full.png`,
  employee: { "@type": "Person", name: company.contactPerson.name, jobTitle: company.contactPerson.title },
  email: contact.email,
  telephone: contact.phones,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Maharashtra",
    addressLocality: "Latur district",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Saudi Arabia" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Opt into JS-driven reveal animations only once JS runs; content stays visible otherwise. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <LeafGradients />
        {children}
      </body>
    </html>
  );
}
