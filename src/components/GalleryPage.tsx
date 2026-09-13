"use client";

import { useState } from "react";
import { ArrowRight, Camera } from "lucide-react";
import { LuxuryPageShell } from "./LuxuryChrome";
import { editorialImages, type EditorialImage } from "@/lib/media";

type Category = "All" | "Clinic spaces" | "Care teams" | "Calm" | "Operations";

const items: { image: EditorialImage; category: Exclude<Category, "All">; caption: string }[] = [
  { image: editorialImages.therapyRoom, category: "Clinic spaces", caption: "Consultation room" },
  { image: editorialImages.clinicLounge, category: "Clinic spaces", caption: "Reception lounge" },
  { image: editorialImages.hospitalHall, category: "Clinic spaces", caption: "Arrival corridor" },
  { image: editorialImages.careInterior, category: "Clinic spaces", caption: "Private practice" },
  { image: editorialImages.therapist, category: "Care teams", caption: "Lead psychologist" },
  { image: editorialImages.specialistWoman, category: "Care teams", caption: "Clinical specialist" },
  { image: editorialImages.specialistMan, category: "Care teams", caption: "Psychotherapist" },
  { image: editorialImages.healthcareTeam, category: "Care teams", caption: "Clinical team" },
  { image: editorialImages.botanical, category: "Calm", caption: "Botanical detail" },
  { image: editorialImages.lake, category: "Calm", caption: "Stillness" },
  { image: editorialImages.forest, category: "Calm", caption: "Quiet light" },
  { image: editorialImages.calmLandscape, category: "Calm", caption: "Open horizon" },
  { image: editorialImages.modernWorkspace, category: "Operations", caption: "Clinic workspace" },
  { image: editorialImages.analyticsDesk, category: "Operations", caption: "Planning desk" },
  { image: editorialImages.strategySession, category: "Operations", caption: "Team review" },
  { image: editorialImages.doctorTablet, category: "Operations", caption: "Digital records" },
];

const categories: Category[] = ["All", "Clinic spaces", "Care teams", "Calm", "Operations"];

export function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const visible = active === "All" ? items : items.filter((item) => item.category === active);

  return (
    <LuxuryPageShell active="/gallery">
      <main>
        <section className="px-5 pb-16 pt-32 sm:px-8 lg:pt-40">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div className="animate-luxury-reveal">
                <span className="luxury-kicker">Gallery</span>
                <h1 className="luxury-title mt-7 text-[clamp(3.4rem,6.4vw,6.6rem)] leading-[.87]">
                  The atmosphere
                  <br />
                  <em className="t-gold">of good care.</em>
                </h1>
              </div>
              <p className="max-w-xl pb-3 text-[15px] leading-8 t-mid animate-luxury-reveal [animation-delay:.12s]">
                A visual reference library for clinics building their TheraFlow presence — spaces, teams, operations and
                the quiet moments that shape how patients feel before an appointment.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActive(category)}
                  className={`rounded-full px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[.13em] ${
                    active === category ? "btn-gold" : "btn-ghost"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="stagger-luxury grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item, index) => (
                <a
                  key={item.image.src}
                  href={item.image.source}
                  target="_blank"
                  rel="noreferrer"
                  className={`luxury-image img-tone group relative rounded-sm ${index % 5 === 0 ? "h-80 sm:h-96" : "h-72"}`}
                >
                  <img src={item.image.src} alt={item.image.alt} />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4">
                    <span className="block text-[9px] font-extrabold uppercase tracking-[.15em] t-gold">{item.category}</span>
                    <span className="mt-1 block text-sm font-bold text-white">{item.caption}</span>
                  </span>
                  <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/45 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <Camera size={15} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0b0b0d] px-5 py-24 text-center sm:px-8">
          <h2 className="luxury-title text-5xl sm:text-6xl">Use your own photography.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 t-mid">
            Every image here is a placeholder from Unsplash. In production, your clinic&rsquo;s spaces, specialists and
            brand assets take their place.
          </p>
          <a href="/contact" className="btn-gold mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[10px] uppercase tracking-[.13em]">
            Plan your visual identity <ArrowRight size={14} />
          </a>
        </section>
      </main>
    </LuxuryPageShell>
  );
}
