interface JsonLdProps {
  /** A schema.org document, normally built with `buildGraph` from `lib/seo`. */
  schema: Record<string, unknown>;
}

/**
 * Renders a structured-data block. Kept as a component so every page emits the
 * same script shape and no page hand-rolls `dangerouslySetInnerHTML`.
 */
export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
