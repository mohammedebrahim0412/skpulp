import type { Metadata } from "next";
import { company, contact } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${company.name}`,
  description: `How ${company.name} handles information submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

/*
 * Starter policy describing what this website actually does. Have it reviewed
 * before launch and update it if analytics or other services are added.
 */
export default function Privacy() {
  return (
    <main className="paper-grain min-h-[100svh] pb-24 pt-[calc(4rem+env(safe-area-inset-top))]">
      <div className="container-x max-w-3xl">
        <a href="/" className="inline-flex min-h-11 items-center text-sm font-semibold text-forest">
          ← {company.name}
        </a>
        <h1 className="mt-10 text-headline font-extrabold">Privacy Policy</h1>
        <div className="mt-10 space-y-6 text-charcoal/80 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-charcoal">
          <p>
            This policy explains how {company.name} (&ldquo;we&rdquo;) handles information you share through this
            website.
          </p>
          <h2>Information we collect</h2>
          <p>
            This website does not collect personal information through forms. When you contact us by phone, WhatsApp
            or email, we receive the details you choose to share, such as your name, company, contact details and
            product requirements.
          </p>
          <h2>How we use it</h2>
          <p>
            We use these details only to respond to your enquiry and to discuss your product and supply requirements.
            We do not sell your information.
          </p>
          <h2>How long we keep it</h2>
          <p>
            We keep enquiry information only as long as needed for the business relationship or as required by law.
          </p>
          <h2>Cookies</h2>
          <p>This website does not use advertising or tracking cookies.</p>
          <h2>Your choices</h2>
          <p>
            You may ask us to access, correct or delete the information you have sent us
            {contact.email ? (
              <>
                {" "}by writing to <a className="font-semibold text-forest underline" href={`mailto:${contact.email}`}>{contact.email}</a>
              </>
            ) : (
              " using the contact details on our website"
            )}
            .
          </p>
          <p className="text-sm text-steel">{company.location.full}</p>
          <h2>Credits</h2>
          <p className="text-sm">
            India map from{" "}
            <a
              className="font-semibold text-forest underline"
              href="https://github.com/VictorCazanave/svg-maps"
              target="_blank"
              rel="noopener noreferrer"
            >
              svg-maps
            </a>
            , licensed under{" "}
            <a
              className="font-semibold text-forest underline"
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY 4.0
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
