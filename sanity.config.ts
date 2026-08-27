"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { seedToolPlugin } from "./sanity/plugins/seedTool";

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "y09xqnap",
  dataset: dataset || "production",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    seedToolPlugin(),
  ],
});
