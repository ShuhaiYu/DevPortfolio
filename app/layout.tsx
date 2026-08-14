import type { Metadata } from "next";
import { Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import PaletteProvider from "@/components/palette/PaletteProvider";
import NowWidget from "@/components/portfolio/NowWidget";
import AIChat from "@/components/chat/AIChat";
import JsonLd from "@/components/seo/JsonLd";
import ChatStateProvider from "@/components/ui/ChatStateProvider";
import { client } from "@/lib/sanity/client";
import { projectsSummaryQuery, latestPostsQuery } from "@/lib/sanity/queries";
import { OWNER_NAME, OWNER_TITLE } from "@/lib/constants";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  personSchema,
  webSiteSchema,
  buildGraph,
} from "@/lib/seo";
import type { ProjectSummary, BlogPost } from "@/lib/types";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Felix Yu",
    "Felix Yu developer",
    "Felix Yu Melbourne",
    "Shuhai Yu",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "AI Integration",
    "Melbourne Developer",
  ],
  authors: [{ name: OWNER_NAME, url: SITE_URL }],
  creator: OWNER_NAME,
  publisher: OWNER_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `${OWNER_NAME} — ${OWNER_TITLE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/og-image.png"],
    creator: "@FelixYuDev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [paletteProjects, palettePosts] = await Promise.all([
    client.fetch<ProjectSummary[]>(projectsSummaryQuery).catch(() => []),
    client.fetch<BlogPost[]>(latestPostsQuery, { limit: 6 }).catch(() => []),
  ]);

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <JsonLd schema={buildGraph([personSchema, webSiteSchema])} />
      </head>
      <body className="bg-dark text-slate-200 antialiased">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:px-4 focus-visible:py-2 focus-visible:bg-primary focus-visible:text-dark focus-visible:font-bold focus-visible:rounded"
        >
          Skip to main content
        </a>
        <div className="scanlines" />
        <PaletteProvider projects={paletteProjects} posts={palettePosts}>
          <ChatStateProvider>
            <div className="relative z-10">{children}</div>
            <NowWidget />
            <AIChat />
          </ChatStateProvider>
        </PaletteProvider>
        <Analytics />
      </body>
    </html>
  );
}
