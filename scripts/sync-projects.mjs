/**
 * Syncs the Sanity `project` documents for three Pixdyne case studies and
 * removes the retired Red Bridge entry.
 *
 * The site reads projects from Sanity, not from source, so editing
 * `lib/constants.ts` alone does not change what /projects renders. This script
 * performs the CMS-side change.
 *
 * Put a write token in .env.local (gitignored) as:
 *   SANITY_API_TOKEN=<editor-or-write-token>
 *
 * Then:
 *   node scripts/sync-projects.mjs            # dry run, prints the plan
 *   node scripts/sync-projects.mjs --apply    # performs the writes
 *
 * Idempotent: documents use deterministic ids, so re-running overwrites rather
 * than duplicating.
 */

import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const APPLY = process.argv.includes("--apply");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Load .env.local if present so the token never has to be exported by hand.
const ENV_FILE = path.join(ROOT, ".env.local");
if (existsSync(ENV_FILE)) {
  process.loadEnvFile(ENV_FILE);
}

const TOKEN = process.env.SANITY_API_TOKEN;

/** Slug of the project to retire. */
const REMOVE_SLUG = "red-bridge";

/**
 * Technology tags for the pre-existing case studies, whose `technologies`
 * field was never populated so their Stack section rendered empty. Applied as
 * a patch, not a replace, so their existing body content survives.
 */
const TECH_PATCHES = {
  "austin-education": [
    "Next.js",
    "TypeScript",
    "Student portal",
    "ATAR calculator",
    "Bilingual (EN/中)",
    "MySQL",
  ],
  "open-mat": ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "CMS"],
  pixcode: [
    "Next.js",
    "TypeScript",
    "OpenAI-compatible API",
    "Tailwind CSS",
    "Stripe",
  ],
};

let keyCounter = 0;
/** Portable Text requires a stable `_key` on every node. */
function nextKey(prefix) {
  keyCounter += 1;
  return `${prefix}${keyCounter}`;
}

/** Builds a Portable Text block. */
function block(style, text) {
  return {
    _type: "block",
    _key: nextKey("b"),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: nextKey("s"), text, marks: [] }],
  };
}

/** Expands a [heading, ...paragraphs] outline into Portable Text. */
function body(sections) {
  return sections.flatMap(([heading, ...paragraphs]) => [
    block("h2", heading),
    ...paragraphs.map((p) => block("normal", p)),
  ]);
}

/**
 * Case study content, carried over verbatim from the Pixdyne project records.
 * `problem`/`approach` map to that source's challenge/solution narrative; no
 * metrics are included because none were verified there.
 */
const PROJECTS = [
  {
    slug: "good-mood-studio",
    title: "Goodmood Studio",
    tagline:
      "Bilingual marketing site for a Melbourne cross-border China–Australia agency.",
    role: "Lead Developer · Pixdyne",
    period: "2025",
    order: 5,
    liveUrl: "https://www.goodmoodstudio.com.au/en",
    image: "public/images/good-mood-studio.webp",
    technologies: [
      "Next.js",
      "TypeScript",
      "Bilingual (EN/中)",
      "Image optimisation",
    ],
    problem:
      "Goodmood Studio is a Melbourne-based marketing agency working in both directions across the China–Australia bridge — helping Chinese brands enter Australia and Australian businesses expand into China. Their site needed to convince two audiences from different markets, in two languages, that the team understands both.",
    approach:
      "Built as a fully bilingual marketing surface — every page renders cleanly in English or Chinese with the same editorial structure on both sides. Six service offerings are surfaced consistently across the languages, and a three-step process framework (Analysis, Strategy, Execution) anchors how the agency works. Image-heavy presentation matters in this industry, so the site uses server-side image optimisation to keep the visual richness from costing speed.",
    metrics: [
      { value: "6", label: "Service pillars" },
      { value: "2", label: "Languages" },
      { value: "3", label: "Process stages" },
      { value: "1", label: "Page, fully anchored" },
    ],
    body: body([
      [
        "One page, two markets",
        "A cross-border agency has an awkward positioning problem: the Chinese brand looking to enter Australia and the Australian business looking to expand into China are reading for different signals, but they are reading the same site. Splitting them into separate microsites would have doubled the maintenance and halved the authority of each.",
        "We kept it to a single anchored page and let language carry the split instead. The English and Chinese versions share an identical editorial structure — same sections, same order, same emphasis — so neither reads like a translation afterthought bolted onto the other.",
      ],
      [
        "Services as a carousel, not a wall",
        "Six offerings — Brand Strategy, PR & Events, Data Analytics, Social Media, Digital Marketing, Creative Content — is enough to turn a services section into an undifferentiated grid nobody reads. We paginated them into a stepped carousel (01/06 through 06/06) so each offering gets the full width of the viewport and its own deliverables list.",
      ],
      [
        "Process as the trust device",
        "For agencies, the how matters as much as the what. A three-stage framework — Analysis, Strategy, Execution — anchors the middle of the page, followed by an FAQ that answers the timeline and quality questions prospects actually ask before enquiring. The contact form carries a service-selection dropdown so an enquiry arrives already categorised.",
      ],
      [
        "Keeping the imagery cheap",
        "Marketing agencies sell on visual richness, which usually means a heavy page. Image handling runs through server-side optimisation and responsive sizing, so the site keeps its editorial weight without paying for it on first load.",
      ],
    ]),
  },
  {
    slug: "insight-idea",
    title: "Insight Idea",
    tagline: "Bilingual marketing site for an Australian immigration consultancy.",
    role: "Lead Developer · Pixdyne",
    period: "2025",
    order: 6,
    liveUrl: "https://www.insightidea.com.au/en",
    image: "public/images/insight-idea.webp",
    technologies: [
      "Next.js",
      "TypeScript",
      "Bilingual (EN/中)",
      "Video-led content",
    ],
    problem:
      "Insight Idea is an Australian immigration consultancy serving visa, education-placement, and Administrative Appeals Tribunal clients. Migration buyers evaluate trust above all else — credentials, partnerships, and outcomes matter more than design polish. The site had to surface professional credentials and success narratives without descending into testimonial-overload generic agency styling.",
    approach:
      "Built as a bilingual marketing surface so prospective migrants research in their own language. MARN and QEAC credentials are surfaced prominently in the page chrome rather than buried, and a strategic partnership is presented as part of the service architecture rather than a logo wall. Video-led client success narratives carry the social proof.",
    metrics: [
      { value: "4", label: "Service verticals" },
      { value: "2", label: "Languages" },
      { value: "MARN", label: "+ QEAC surfaced" },
      { value: "Public", label: "Service fees" },
    ],
    body: body([
      [
        "Credentials belong in the chrome",
        "Migration is a category where the buyer is screening for legitimacy before they read a single line of marketing copy. Registration numbers are the fastest signal available, and burying them in a footer wastes them.",
        "MARN 1467870 and QEAC 5091 sit in the persistent page chrome rather than on an About page, so the credential travels with the visitor across every section they read.",
      ],
      [
        "Publishing the fees",
        "Most consultancies in this space hide pricing behind an enquiry form. Insight Idea publishes a Service Fees section as a top-level navigation item. That decision shapes the information architecture — the site is organised to answer questions rather than to harvest contact details, and the nav reflects it: Australian Visas, Study Programs, Appeals, Service Fees, News, Success Cases.",
      ],
      [
        "Four verticals, one structure",
        "Visa services, study placement, ART appeals, and immigration news each get a parallel treatment rather than a bespoke layout, which keeps the site maintainable as policy changes force frequent content updates. Appeals in particular needed careful handling — it is the highest-anxiety entry point on the site and the one where trust signals do the most work.",
      ],
      [
        "Social proof that is not a logo wall",
        "Success stories run as video-led narratives rather than pull-quote testimonials, and the recruitment partnership is presented inside the service architecture — as a job-placement and career-transition pathway — rather than as a badge in a partner strip.",
      ],
    ]),
  },
  {
    slug: "pet-daddy",
    title: "Pet Daddy",
    tagline:
      "Shopify storefront for a Melbourne pet boutique with integrated grooming booking.",
    role: "Lead Developer · Pixdyne",
    period: "2025",
    order: 7,
    liveUrl: "https://www.petdaddy.com.au/",
    image: "public/images/pet-daddy.webp",
    technologies: ["Shopify", "Grooming booking", "Retail + service"],
    problem:
      "Pet Daddy runs a Surrey Hills pet boutique with both physical retail and a grooming service. They needed an online store that could carry premium pet supplies across dog and cat categories, while also surfacing the grooming booking flow without making it feel like a bolted-on second business.",
    approach:
      "Built the storefront on Shopify and structured the catalogue across roughly fifteen primary categories — food, treats, health, bedding, accessories — for both dog and cat audiences. Grooming bookings live inside the same Shopify back office, so the team isn't reconciling two systems. Comparison and wishlist tools sit on top for customers who want to research before adding to cart.",
    metrics: [
      { value: "15+", label: "Product categories" },
      { value: "2", label: "Species catalogues" },
      { value: "1", label: "Back office, retail + grooming" },
      { value: "$99", label: "Free shipping threshold" },
    ],
    body: body([
      [
        "Two catalogues that mirror each other",
        "Dog and cat shoppers do not browse the same way, but they expect the same shape of store. The catalogue runs as two parallel taxonomies — treats, toys, food, health and grooming, bedding, accessories, collars and leads on the dog side; treats, scratchers, toys, food, climbing, beds, bowls, cleaning and litter on the cat side.",
        "Keeping the two trees structurally parallel means a customer with both a dog and a cat never has to relearn the navigation halfway through a session, and the team only maintains one merchandising pattern.",
      ],
      [
        "Grooming is not a second business",
        "Pet Daddy is a physical boutique on Canterbury Road in Surrey Hills with a grooming service attached, and the temptation with a build like this is to treat the service as a separate site with its own booking tool.",
        "Instead the grooming booking flow sits in the primary navigation alongside the product categories, and bookings land in the same Shopify back office as orders. One system, one place to look — the counter staff are not reconciling a booking calendar against a store dashboard.",
      ],
      [
        "Tools for shoppers who research",
        "Premium pet supply buyers compare before they commit, particularly on food and health products. Wishlists let a customer park candidates across sessions, and a three-item comparison view puts specifications side by side without leaving the catalogue. Stock status and sale badges render on the card, so the browsing grid answers availability before the click.",
      ],
    ]),
  },
];

function requireToken() {
  if (!TOKEN) {
    console.error(
      "SANITY_API_TOKEN is not set. Create a write token at\n" +
        "  https://www.sanity.io/manage/project/1efjjikg/api#tokens\n" +
        "then add it to .env.local as:\n" +
        "  SANITY_API_TOKEN=<token>",
    );
    process.exit(1);
  }
}

const client = createClient({
  projectId: "1efjjikg",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: TOKEN,
});

/** Uploads a local image and returns its asset id. */
async function uploadImage(relativePath) {
  const absolute = path.join(ROOT, relativePath);
  const buffer = await readFile(absolute);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(absolute),
  });
  return asset._id;
}

async function main() {
  const existing = await client.fetch(
    `*[_type == "project"]{
      _id,
      "slug": slug.current,
      title,
      "heroAssetId": heroImage.asset._ref,
      "techCount": count(technologies)
    }`,
  );
  const bySlug = new Map(existing.map((doc) => [doc.slug, doc]));

  console.log(`Existing projects: ${existing.map((d) => d.slug).join(", ")}\n`);

  console.log("Plan:");
  for (const project of PROJECTS) {
    const verb = bySlug.has(project.slug) ? "update" : "create";
    console.log(`  ${verb.padEnd(6)} ${project.slug}  (+body, +metrics)`);
  }
  for (const slug of Object.keys(TECH_PATCHES)) {
    const doc = bySlug.get(slug);
    console.log(
      `  ${"patch".padEnd(6)} ${slug}  ${
        doc ? `technologies (currently ${doc.techCount ?? 0})` : "(not found)"
      }`,
    );
  }
  const doomed = bySlug.get(REMOVE_SLUG);
  console.log(
    `  ${"delete".padEnd(6)} ${REMOVE_SLUG}  ${
      doomed ? `(${doomed._id})` : "(not found — nothing to delete)"
    }\n`,
  );

  if (!APPLY) {
    console.log("Dry run. Re-run with --apply to perform these writes.");
    return;
  }

  requireToken();

  for (const project of PROJECTS) {
    const current = bySlug.get(project.slug);
    // Re-uploading on every run would orphan a new asset each time, so reuse
    // the hero already attached to the document when one is present.
    const assetId =
      current?.heroAssetId ?? (await uploadImage(project.image));

    const doc = {
      _id: `project-${project.slug}`,
      _type: "project",
      title: project.title,
      tagline: project.tagline,
      slug: { _type: "slug", current: project.slug },
      role: project.role,
      period: project.period,
      featured: true,
      order: project.order,
      liveUrl: project.liveUrl,
      technologies: project.technologies,
      problem: project.problem,
      approach: project.approach,
      metrics: project.metrics.map((m) => ({ ...m, _key: nextKey("m") })),
      body: project.body,
      heroImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      },
      publishedAt: new Date().toISOString(),
    };

    await client.createOrReplace(doc);
    console.log(`✓ wrote ${project.slug} (${doc.body.length} body blocks)`);

    // A pre-existing document under a different id would shadow ours in the
    // slug-based queries, so clear any duplicate that is not the one we manage.
    if (current && current._id !== doc._id) {
      await client.delete(current._id);
      console.log(`  ↳ removed duplicate ${current._id}`);
    }
  }

  for (const [slug, technologies] of Object.entries(TECH_PATCHES)) {
    const doc = bySlug.get(slug);
    if (!doc) {
      console.log(`· skipped ${slug} (not in dataset)`);
      continue;
    }
    await client.patch(doc._id).set({ technologies }).commit();
    console.log(`✓ patched ${slug} technologies (${technologies.length} tags)`);
  }

  if (doomed) {
    await client.delete(doomed._id);
    console.log(`✓ deleted ${REMOVE_SLUG} (${doomed._id})`);
  }

  console.log("\nDone. /projects revalidates within an hour, or redeploy now.");
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
