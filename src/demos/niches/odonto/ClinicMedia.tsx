import Image from "next/image";
import type { DemoClient } from "../../types";
import { SectionHead } from "../../components/blocks";
import { InstagramIcon } from "../../components/icons";

/** Fotos e vídeos reais. Sem arquivos, o template não renderiza a seção. */
export function ClinicMedia({
  client,
  content,
}: {
  client: DemoClient;
  content: { eyebrow: string; title: string; accent: string; text: string };
}) {
  return (
    <section id="galeria" className="d-section od-gallery-section">
      <div className="d-container">
        <SectionHead {...content} center />
        <div className="od-gallery">
          {client.photos?.gallery?.map((photo) => (
            <figure key={photo.src} className="od-media" data-reveal>
              <div className="od-media-image">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  unoptimized
                />
              </div>
              {photo.caption || photo.sourceUrl ? (
                <figcaption>
                  {photo.caption ? <p>{photo.caption}</p> : null}
                  {photo.sourceUrl ? (
                    <a
                      href={photo.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="od-media-link"
                    >
                      <InstagramIcon width={16} height={16} />
                      {photo.sourceLabel ?? "Ver publicação no Instagram"}
                    </a>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
          ))}
          {client.videos?.map((video) => (
            <figure key={video.src} className="od-media" data-reveal>
              <video controls playsInline preload="none" poster={video.poster} aria-label={video.caption}>
                <source src={video.src} />
                Seu navegador não suporta este vídeo. <a href={video.src}>Abrir o vídeo</a>.
              </video>
              <figcaption>{video.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
