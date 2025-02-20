// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";

import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
        '@styles': '/src/styles',
      },
    },
  },

  integrations: [react({
    experimentalReactChildren: true,
  }), icon()],

  experimental: {
    svg: true,
  },

  i18n: {
    defaultLocale: "en",
    routing: {prefixDefaultLocale: true},
    locales: ["en", "es"],
  },

  adapter: vercel()
});