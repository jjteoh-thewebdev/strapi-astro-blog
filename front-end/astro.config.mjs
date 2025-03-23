import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig, squooshImageService } from "astro/config";
import config from "./src/config/config.json";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  },
  site: config.site.base_url ? config.site.base_url : "http://localhost:5000",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  image: {
    service: squooshImageService(),
  },
  devToolbar: {
    enabled: true,
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
  ],
  // output: "hybrid", //mixture of static and server-rendered content
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
