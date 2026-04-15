import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
      description: "One-liner shown on cards and case study hero",
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      description: "e.g. Lead Developer",
    }),
    defineField({
      name: "period",
      type: "string",
      description: "e.g. 2024 · 6 months",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower number appears first",
      initialValue: 10,
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "liveUrl",
      type: "url",
    }),
    defineField({
      name: "repoUrl",
      type: "url",
    }),
    defineField({
      name: "technologies",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "problem",
      type: "text",
      rows: 3,
      description: "What was broken / missing / needed",
    }),
    defineField({
      name: "approach",
      type: "text",
      rows: 4,
      description: "How I tackled it — key decisions and tradeoffs",
    }),
    defineField({
      name: "metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
      description: "Up to 4 KPI blocks shown in the metrics bar",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "Link",
                name: "link",
                type: "object",
                fields: [{ title: "URL", name: "href", type: "url" }],
              },
            ],
          },
        },
        { type: "image", options: { hotspot: true } },
        {
          type: "code",
          options: {
            language: "typescript",
            languageAlternatives: [
              { title: "TypeScript", value: "typescript" },
              { title: "JavaScript", value: "javascript" },
              { title: "Python", value: "python" },
              { title: "CSS", value: "css" },
              { title: "HTML", value: "html" },
              { title: "Bash", value: "bash" },
              { title: "JSON", value: "json" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional screenshots shown in the gallery grid",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "title", media: "heroImage", subtitle: "role" },
  },
});
