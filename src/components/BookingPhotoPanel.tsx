"use client";

import { MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import { pagePhotoSets } from "@/lib/media";
import { useBookingStore } from "@/lib/store";

const photos = pagePhotoSets.booking;

export function BookingPhotoPanel() {
  const { locale, clinic } = useBookingStore();

  return (
    <aside className="relative overflow-hidden border-b border-white/10 bg-[#0b0b0d] lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
      {/* Mobile ribbon */}
      <div className="grid h-28 grid-cols-4 gap-1 p-2 sm:h-36 lg:hidden">
        {photos.map((photo, index) => (
          <a
            key={photo.src}
            href={photo.source}
            target="_blank"
            rel="noreferrer"
            className="luxury-image img-tone animate-image-reveal rounded-sm"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <img src={photo.src} alt={photo.alt} />
          </a>
        ))}
      </div>

      {/* Desktop composition */}
      <div className="relative hidden h-full p-5 lg:block xl:p-7">
        <a href="/" className="absolute left-9 top-8 z-20 flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/30 t-gold backdrop-blur">
            <Sparkles size={16} />
          </span>
          <span className="luxury-title text-2xl text-white">TheraFlow</span>
        </a>

        <a href={photos[0].source} target="_blank" rel="noreferrer" className="luxury-image img-tone photo-grain absolute inset-5 bottom-[31%] rounded-sm xl:inset-7 xl:bottom-[30%]">
          <img src={photos[0].src} alt={photos[0].alt} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />
        </a>

        <div className="absolute inset-x-12 top-[46%] z-10 xl:inset-x-16">
          <span className="text-[9px] font-extrabold uppercase tracking-[.2em] t-gold">Private care, thoughtfully arranged</span>
          <h2 className="luxury-title mt-3 text-4xl leading-[.95] text-white xl:text-5xl">
            Your next step
            <br />
            toward feeling better.
          </h2>
          <div className="mt-5 flex items-center gap-3 text-[10px] t-mid">
            <span className="flex items-center gap-1"><Star size={11} className="t-gold" fill="currentColor" /> 4.9 patient rating</span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1"><ShieldCheck size={11} className="t-gold" /> Private &amp; secure</span>
          </div>
        </div>

        <div className="absolute inset-x-5 bottom-5 grid h-[27%] grid-cols-3 gap-2 xl:inset-x-7 xl:bottom-7">
          {photos.slice(1).map((photo, index) => (
            <a
              key={photo.src}
              href={photo.source}
              target="_blank"
              rel="noreferrer"
              className="luxury-image img-tone animate-image-reveal rounded-sm"
              style={{ animationDelay: `${220 + index * 100}ms` }}
            >
              <img src={photo.src} alt={photo.alt} />
            </a>
          ))}
        </div>

        <div className="absolute bottom-[32%] right-8 z-20 rounded-full bg-black/60 px-3 py-1.5 text-[8px] font-bold text-white/70 backdrop-blur">
          Photos on Unsplash
        </div>
      </div>

      {/* Mobile clinic bar */}
      <div className="mx-3 mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-[#121215] px-4 py-3 lg:hidden">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider t-dim">{clinic?.name}</p>
          <p className="luxury-title mt-0.5 text-xl">{locale === "pl" ? "Zarezerwuj spokojnie" : "Book with confidence"}</p>
        </div>
        <span className="flex items-center gap-1 text-[9px] t-low"><MapPin size={11} /> Warszawa</span>
      </div>
    </aside>
  );
}
