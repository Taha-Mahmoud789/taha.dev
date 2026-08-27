import type { Metadata } from "next";
import type { JSX } from "react";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);document.documentElement.classList.toggle("light",!d);}catch(e){document.documentElement.classList.add("dark");}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Taha Mahmoud — Frontend Developer",
  description:
    "Frontend developer crafting fast, accessible, and pixel-perfect web experiences with React, Next.js, and modern tooling.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Taha Mahmoud — Portfolio",
    title: "Taha Mahmoud — Frontend Developer",
    description:
      "Frontend developer crafting fast, accessible, and pixel-perfect web experiences with React, Next.js, and modern tooling.",
    images: [
      {
        // حط الصورة دي في public/og-image.png (مقاس 1200×630) أو غيّر المسار لو اسمها مختلف
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Taha Mahmoud — Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taha Mahmoud — Frontend Developer",
    description:
      "Frontend developer crafting fast, accessible, and pixel-perfect web experiences with React, Next.js, and modern tooling.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} grain h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full font-body" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
