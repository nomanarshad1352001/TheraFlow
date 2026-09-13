import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GlobalMotion } from "@/components/GlobalMotion";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TheraFlow — Patient Access & Clinic Operations",
    template: "%s | TheraFlow",
  },
  description:
    "A luxury white-label patient booking platform and clinic CRM for therapists, private practices, mental health clinics, and care networks.",
  keywords: ["therapy booking", "clinic CRM", "patient booking", "mental health SaaS", "telehealth", "clinic operations"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
        <GlobalMotion>{children}</GlobalMotion>
      </body>
    </html>
  );
}
