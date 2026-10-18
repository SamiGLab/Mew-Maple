import { defineConfig } from 'astro/config';
// SITE_URL must be your verified, owned domain before publishing.
export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'https://preview.invalid',
  trailingSlash: 'always',
  // Keep the development toolbar from obscuring editorial screenshot reviews.
  devToolbar: { enabled: false },
});
