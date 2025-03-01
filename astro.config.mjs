// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";

import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

import robotsTxt from 'astro-robots-txt';

import expressiveCode from 'astro-expressive-code';

// import sentry from '@sentry/astro';
// import spotlightjs from '@spotlightjs/astro';

// https://astro.build/config
export default defineConfig({
  site: "https://eslavi-cv.vercel.app",
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
  }), icon(), sitemap({
    i18n: {
      defaultLocale: 'en', // All urls that don't contain `es` after `https://eslavi-cv.vercel.app/` will be treated as default locale, i.e. `en`
      locales: {
        en: 'en-US', // The `defaultLocale` value must present in `locales` keys
        es: 'es-MX',
      },
    },
  }), robotsTxt(), expressiveCode({
    themes: ['rose-pine', 'rose-pine-dawn'],
    shiki: {
      // Example: Only include languages 'astro' and 'sass'
      // in the bundle, reducing SSR bundle size by 80%
      bundledLangs: ['astro', 'sass'],
    },
    frames: {
      // Example: Hide the "Copy to clipboard" button
      showCopyToClipboardButton: false,
    },
  })],
  // }), icon(), sentry(), spotlightjs()],

  experimental: {
    svg: true,
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },

  adapter: vercel()
});