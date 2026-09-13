"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";

interface RailSection {
  label: string;
  node: HTMLElement;
}

export function GlobalMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const routeRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<RailSection[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setExiting(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.classList.add("motion-enhanced");

    const route = routeRef.current;
    if (!route) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.motionVisible = "";
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scanRoute = () => {
      const sectionNodes = Array.from(route.querySelectorAll<HTMLElement>("main section")).filter(
        (section) => !section.closest("[role='dialog']"),
      );

      const railSections = sectionNodes.map((node, index) => {
        const heading = node.querySelector<HTMLElement>("h1, h2, h3");
        const rawLabel = heading?.textContent?.replace(/\s+/g, " ").trim() || `Section ${index + 1}`;
        return {
          node,
          label: rawLabel.length > 34 ? `${rawLabel.slice(0, 32)}…` : rawLabel,
        };
      });

      sectionsRef.current = railSections;
      const nextLabels = railSections.map((section) => section.label);
      setSections((current) =>
        current.length === nextLabels.length && current.every((label, index) => label === nextLabels[index])
          ? current
          : nextLabels,
      );

      const revealTargets = Array.from(
        route.querySelectorAll<HTMLElement>(
          "main section, main article, main .surface, main .luxury-image, main [class*='grid'] > a",
        ),
      ).filter((element) => !element.hasAttribute("data-global-reveal"));

      revealTargets.forEach((element, index) => {
        element.dataset.globalReveal = "";
        element.style.setProperty("--global-reveal-delay", `${(index % 5) * 55}ms`);
        revealObserver.observe(element);
      });
    };

    scanRoute();

    const mutationObserver = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
        scanRoute();
      }
    });
    mutationObserver.observe(route, { childList: true, subtree: true });

    let frame = 0;
    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const nextProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
        setProgress(nextProgress);
        document.documentElement.style.setProperty("--global-parallax", `${(nextProgress - 0.5) * 18}px`);

        const focusLine = window.innerHeight * 0.42;
        let current = 0;
        sectionsRef.current.forEach((section, index) => {
          if (section.node.getBoundingClientRect().top <= focusLine) current = index;
        });
        setActiveSection(current);
        frame = 0;
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const onNavigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === pathname) return;

      event.preventDefault();
      setExiting(true);
      window.setTimeout(() => router.push(`${url.pathname}${url.search}${url.hash}`), 280);
    };

    document.addEventListener("click", onNavigate);
    return () => document.removeEventListener("click", onNavigate);
  }, [pathname, router]);

  const goToSection = (index: number) => {
    const target = sectionsRef.current[index]?.node;
    if (!target) return;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
  };

  return (
    <>
      <div className="global-top-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div
        ref={routeRef}
        key={pathname}
        className={`global-route-frame ${exiting ? "global-route-exit" : "global-route-enter"}`}
      >
        {children}
      </div>

      {sections.length > 1 && (
        <aside className="global-scroll-rail" aria-label="Page section navigation">
          <span className="global-rail-caption">Scroll</span>
          <div className="global-rail-track">
            <span className="global-rail-fill" style={{ transform: `scaleY(${progress})` }} />
            <span className="global-rail-thumb" style={{ top: `${progress * 100}%` }} />
            <div className="global-rail-markers">
              {sections.map((label, index) => (
                <button
                  key={`${label}-${index}`}
                  onClick={() => goToSection(index)}
                  className={index === activeSection ? "is-active" : ""}
                  aria-label={`Go to ${label}`}
                  title={label}
                >
                  <span />
                  <em>{String(index + 1).padStart(2, "0")}</em>
                </button>
              ))}
            </div>
          </div>
          <ArrowDown size={12} aria-hidden="true" />
        </aside>
      )}

      {sections.length > 1 && (
        <div className="global-mobile-rail" aria-hidden="true">
          <span>{String(activeSection + 1).padStart(2, "0")}</span>
          <div><i style={{ transform: `scaleX(${progress})` }} /></div>
          <span>{String(sections.length).padStart(2, "0")}</span>
        </div>
      )}

      <div className={`global-route-curtain ${exiting ? "is-active" : ""}`} aria-hidden="true">
        <span />
      </div>
    </>
  );
}
