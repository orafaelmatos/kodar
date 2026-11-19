import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Comparison } from "@/components/sections/Comparison";
import { Conversion } from "@/components/sections/Conversion";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { site } from "@/config/site";
import { faq } from "@/content/faq";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    slogan: site.slogan,
    url: site.url,
    logo: `${site.url}/brand/logos/kodar-horizontal.svg`,
    telephone: `+${site.contact.whatsapp}`,
    founder: { "@type": "Person", name: site.founder },
    areaServed: { "@type": "Country", name: "Brasil" },
    knowsAbout: site.products.map((product) => product.title),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${site.contact.whatsapp}`,
      contactType: "sales",
      availableLanguage: "Portuguese",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only fixed top-4 left-4 z-[60] rounded-md bg-menta px-6 py-4 font-semibold text-on-brand focus:not-sr-only"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <Products />
        <Conversion />
        <Comparison />
        <Process />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
