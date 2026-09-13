"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ArrowRight, HeartHandshake, Menu, X } from "lucide-react";

const links = [
  { href: "/platform", label: "Platform" },
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export function LuxuryPageShell({ children, active }: { children: ReactNode; active?: string }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#08080a]">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
          scrolled ? "border-white/10 bg-[#08080a]/95 backdrop-blur-xl" : "border-transparent bg-[#08080a]/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1380px] items-center justify-between px-5 sm:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="TheraFlow home">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#d9bc7f]/45 t-gold">
              <HeartHandshake size={19} />
            </span>
            <span className="luxury-title text-[1.6rem] leading-none">TheraFlow</span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative py-2 text-[11.5px] font-bold uppercase tracking-[.13em] ${
                  active === link.href
                    ? "t-gold after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-[#d9bc7f]"
                    : "t-mid hover:text-[#f7f5f0]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <a href="/crm/login" className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-[.12em] t-mid hover:text-[#d9bc7f]">
              CRM login
            </a>
            <a href="/book" className="btn-gold group flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[.12em]">
              Book a visit <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            onClick={() => setMenu(!menu)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 t-hi sm:hidden"
            aria-label="Toggle navigation"
          >
            {menu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menu && (
          <div className="animate-slide-down border-t border-white/10 bg-[#0e0e11] p-5 sm:hidden">
            <nav className="space-y-1">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="block rounded-xl px-3 py-3 text-sm font-semibold t-hi">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href="/crm/login" className="btn-ghost rounded-full px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider">
                CRM login
              </a>
              <a href="/book" className="btn-gold rounded-full px-4 py-3 text-center text-[11px] uppercase tracking-wider">
                Book a visit
              </a>
            </div>
          </div>
        )}
      </header>

      {children}

      <footer className="border-t border-white/10 bg-[#0b0b0d] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <a href="/" className="luxury-title text-4xl">TheraFlow</a>
              <p className="mt-4 max-w-sm text-xs leading-6 t-low">
                Patient booking and clinic operations for therapists, mental health practices, and modern care networks.
              </p>
              <a href="/contact" className="mt-6 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.15em] t-gold">
                Talk to our team <ArrowRight size={13} />
              </a>
            </div>
            {[
              ["Product", [["Platform", "/platform"], ["Features", "/features"], ["Technology", "/technology"], ["Security", "/security"]]],
              ["Company", [["Solutions", "/solutions"], ["Pricing", "/pricing"], ["About", "/about"], ["Contact", "/contact"]]],
              ["Experience", [["Gallery", "/gallery"], ["Patient booking", "/book"], ["CRM login", "/crm/login"], ["CRM dashboard", "/crm"]]],
            ].map(([title, items]) => (
              <div key={title as string}>
                <p className="text-[9px] font-extrabold uppercase tracking-[.2em] t-dim">{title as string}</p>
                <div className="mt-5 space-y-3 text-xs font-semibold">
                  {(items as string[][]).map(([label, href]) => (
                    <a key={href} className="block t-mid hover:text-[#d9bc7f]" href={href}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[.14em] t-dim sm:flex-row">
            <span>© 2026 TheraFlow · Interactive product concept</span>
            <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="hover:text-[#d9bc7f]">
              Photography via Unsplash ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
