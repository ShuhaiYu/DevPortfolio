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
    `*[_type == "project"]{ _id, "slug": slug.current, title }`,
  );
  const bySlug = new Map(existing.map((doc) => [doc.slug, doc]));

  console.log(`Existing projects: ${existing.map((d) => d.slug).join(", ")}\n`);

  console.log("Plan:");
  for (const project of PROJECTS) {
    const verb = bySlug.has(project.slug) ? "update" : "create";
    console.log(`  ${verb.padEnd(6)} ${project.slug}  (${project.title})`);
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
    const assetId = await uploadImage(project.image);
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
      heroImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      },
      publishedAt: new Date().toISOString(),
    };

    await client.createOrReplace(doc);
    console.log(`✓ wrote ${project.slug}`);

    // A pre-existing document under a different id would shadow ours in the
    // slug-based queries, so clear any duplicate that is not the one we manage.
    const stale = bySlug.get(project.slug);
    if (stale && stale._id !== doc._id) {
      await client.delete(stale._id);
      console.log(`  ↳ removed duplicate ${stale._id}`);
    }
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
