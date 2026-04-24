// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import site from './src/content/site.json';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: site.url,
  vite: {
    plugins: [tailwindcss()],
  },
});
