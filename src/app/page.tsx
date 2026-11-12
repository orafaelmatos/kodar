import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Solutions } from "@/components/sections/Solutions";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { site } from "@/config/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/brand/logos/kodar-horizontal.svg`,
  telephone: `+${site.contact.whatsapp}`,
  founder: { "@type": "Person", name: site.founder },
  areaServed: { "@type": "Country", name: "Brasil" },
  knowsAbout: site.services.map((service) => service.title),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${site.contact.whatsapp}`,
    contactType: "sales",
    availableLanguage: "Portuguese",
  },
};

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only fixed top-4 left-4 z-50 rounded-md bg-menta px-6 py-4 font-semibold text-on-brand focus:not-sr-only"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Services />
        <Solutions />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
