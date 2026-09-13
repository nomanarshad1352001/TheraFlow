"use client";

import { ArrowRight } from "lucide-react";
import type { EditorialImage } from "@/lib/media";

export function EditorialHero({
  eyebrow,
  title,
  italic,
  description,
  photos,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  description: string;
  photos: EditorialImage[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative px-5 pb-24 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
      <div className="pointer-events-none absolute left-[10%] top-28 h-72 w-72 rounded-full bg-[#d9bc7f]/[.07] blur-[110px] animate-drift" />
      <div className="relative mx-auto max-w-[1380px]">
        <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-end">
          <div className="animate-luxury-reveal">
            <span className="luxury-kicker">{eyebrow}</span>
            <h1 className="luxury-title mt-7 text-[clamp(3.5rem,6.6vw,6.8rem)] leading-[.87]">
              {title}
              <br />
              <em className="t-gold">{italic}</em>
            </h1>
          </div>
          <div className="animate-luxury-reveal pb-2 [animation-delay:.14s]">
            <p className="max-w-xl text-[15px] leading-8 t-mid">{description}</p>
            {(primary || secondary) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {primary && (
                  <a href={primary.href} className="btn-gold group flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[10px] uppercase tracking-[.13em]">
                    {primary.label} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                )}
                {secondary && (
                  <a href={secondary.href} className="btn-ghost rounded-full px-6 py-3.5 text-center text-[10px] font-extrabold uppercase tracking-[.13em]">
                    {secondary.label}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 grid h-[520px] grid-cols-12 grid-rows-12 gap-2 animate-image-reveal sm:h-[660px]">
          <a href={photos[0].source} target="_blank" rel="noreferrer" className="luxury-image img-tone photo-grain relative col-span-8 row-span-12 rounded-sm">
            <img src={photos[0].src} alt={photos[0].alt} />
          </a>
          <a href={photos[1].source} target="_blank" rel="noreferrer" className="luxury-image img-tone col-span-4 row-span-5 rounded-sm">
            <img src={photos[1].src} alt={photos[1].alt} />
          </a>
          <a href={photos[2].source} target="_blank" rel="noreferrer" className="luxury-image img-tone col-span-4 row-span-4 rounded-sm">
            <img src={photos[2].src} alt={photos[2].alt} />
          </a>
          <a href={photos[3].source} target="_blank" rel="noreferrer" className="luxury-image img-tone relative col-span-4 row-span-3 rounded-sm">
            <img src={photos[3].src} alt={photos[3].alt} />
            <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-1 text-[8px] font-semibold text-white/80 backdrop-blur">Unsplash</span>
          </a>
        </div>
      </div>
    </section>
  );
}
