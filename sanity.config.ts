import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "devportfolio-studio",
  title: "DevPortfolio Blog",

  projectId: "1efjjikg",
  dataset: "production",

  plugins: [structureTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },

  basePath: "/studio",
});
