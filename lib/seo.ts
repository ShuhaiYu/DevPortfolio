import {
  OWNER_NAME,
  OWNER_TITLE,
  BIO,
  SKILLS,
  SOCIAL_LINKS,
  EXPERIENCES,
} from "./constants";

/**
 * Single source of truth for every absolute URL and identity signal the site
 * emits. Search engines resolve "who owns this domain" by cross-checking these
 * values against the same person's external profiles, so they must stay
 * byte-identical everywhere they appear.
 */
export const SITE_URL = "https://www.felixyu.net";

/** Legal/display name used in metadata. Matches the domain deliberately. */
export const SITE_NAME = OWNER_NAME;

/**
 * The name used on GitHub and LinkedIn. Declaring it as `alternateName` is what
 * lets Google merge those profiles into the same entity as `felixyu.net`.
 */
export const OWNER_ALTERNATE_NAME = "Shuhai Yu";

export const OWNER_EMAIL = "info@felixyu.net";
export const OWNER_LOCALITY = "Melbourne";
export const OWNER_REGION = "VIC";
export const OWNER_COUNTRY = "AU";

export const DEFAULT_TITLE = `${OWNER_NAME} — ${OWNER_TITLE} & Creative Engineer`;

export const DEFAULT_DESCRIPTION = `${OWNER_NAME} is a ${OWNER_TITLE.toLowerCase()} based in ${OWNER_LOCALITY}, Australia, building fast, accessible web products with React, Next.js, TypeScript, and AI integrations.`;

export const OWNER_IMAGE = `${SITE_URL}/images/felixyu.png`;
export const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

/** Every profile that represents the same person, for schema.org `sameAs`. */
const PROFILE_URLS: readonly string[] = SOCIAL_LINKS.filter(
  (link) => !link.url.startsWith("mailto:"),
).map((link) => link.url);

/**
 * Builds an absolute URL from a site-relative path.
 * Canonical tags and structured data must never emit relative URLs.
 */
export function absoluteUrl(path = "/"): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** The current employer, used for the Person → worksFor relationship. */
const currentRole = EXPERIENCES.find((experience) =>
  experience.period.toLowerCase().includes("present"),
);

/**
 * schema.org Person describing the site owner. This is the primary tool for
 * disambiguating a common name: the richer and more cross-linkable it is, the
 * more confidently a search engine can separate this person from namesakes.
 */
export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: OWNER_NAME,
  alternateName: OWNER_ALTERNATE_NAME,
  url: SITE_URL,
  image: {
    "@type": "ImageObject",
    url: OWNER_IMAGE,
    caption: `${OWNER_NAME} — ${OWNER_TITLE}`,
  },
  jobTitle: OWNER_TITLE,
  description: BIO,
  email: `mailto:${OWNER_EMAIL}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: OWNER_LOCALITY,
    addressRegion: OWNER_REGION,
    addressCountry: OWNER_COUNTRY,
  },
  ...(currentRole
    ? { worksFor: { "@type": "Organization", name: currentRole.company } }
    : {}),
  knowsAbout: SKILLS,
  sameAs: PROFILE_URLS,
} as const;

/**
 * schema.org WebSite tied to the Person via `publisher`/`author`. Without this
 * link the domain and the person remain separate entities to a crawler.
 */
export const webSiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
  author: { "@id": `${SITE_URL}/#person` },
} as const;

/**
 * Wraps schema nodes in a single `@graph` document. One graph per page keeps
 * `@id` cross-references resolvable and avoids duplicate Person definitions.
 */
export function buildGraph(
  nodes: readonly Record<string, unknown>[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

/** Builds a BreadcrumbList so deep pages report their place in the hierarchy. */
export function breadcrumbSchema(
  items: readonly BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
