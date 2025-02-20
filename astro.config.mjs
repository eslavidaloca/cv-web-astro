// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";

import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

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
  }), icon(), sentry(), spotlightjs()],

  experimental: {
    svg: true,
  },

  i18n: {
    defaultLocale: "en",
    // routing: {prefixDefaultLocale: false},
    locales: ["en", "es"],
  },

  adapter: vercel()
});