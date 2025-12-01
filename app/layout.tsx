import type { Metadata } from "next";
import { Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.felixyu.net"),
  title: {
    default: "Felix Dev | Creative Developer",
    template: "%s | Felix Dev",
  },
  description:
    "Felix Yu - Full Stack Developer specializing in React, Next.js, TypeScript, and AI integrations. Building modern web applications with cutting-edge technologies.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "AI Integration",
    "Melbourne Developer",
  ],
  authors: [{ name: "Felix Yu" }],
  creator: "Felix Yu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.felixyu.net",
    siteName: "Felix Dev",
    title: "Felix Dev | Creative Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript, and AI integrations.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Felix Dev - Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Felix Dev | Creative Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript, and AI integrations.",
    images: ["/images/og-image.png"],
    creator: "@FelixYuDev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Felix Yu",
              url: "https://www.felixyu.net",
              jobTitle: "Full Stack Developer",
              sameAs: [
                "https://github.com/ShuhaiYu",
                "https://linkedin.com/in/shuhaiyu",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "AI Integration",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-dark text-slate-200 antialiased">
        <div className="scanlines" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
