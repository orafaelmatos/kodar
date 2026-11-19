"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappUrl } from "@/config/site";

/** Atalho fixo para o WhatsApp, que aparece depois do hero. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Kodar no WhatsApp"
      className="floating-whatsapp bg-menta text-on-brand"
      data-visible={visible || undefined}
      tabIndex={visible ? undefined : -1}
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
