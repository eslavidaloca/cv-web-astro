// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";

import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

import robotsTxt from 'astro-robots-txt';

import svelte from '@astrojs/svelte';

// import sentry from '@sentry/astro';
// import spotlightjs from '@spotlightjs/astro';

// https://astro.build/config
export default defineConfig({
  site: "https://eslavi-cv.vercel.app",
  prefetch: true,
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
  }), icon({
    svgoOptions: {
      multipass: true,
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              cleanupIds: false,
            }
          }
        }
      ]
    }
  }), sitemap({
    i18n: {
      defaultLocale: 'en', // All urls that don't contain `es` after `https://eslavi-cv.vercel.app/` will be treated as default locale, i.e. `en`
      locales: {
        en: 'en-US', // The `defaultLocale` value must present in `locales` keys
        es: 'es-MX',
      },
    },
  }), robotsTxt(), svelte()],
  // }), icon(), sentry(), spotlightjs()],

  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },

  adapter: vercel()
});