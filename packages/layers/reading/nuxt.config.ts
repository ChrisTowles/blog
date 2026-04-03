import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineNuxtConfig({
  css: [resolve(__dirname, 'app/assets/css/reading-theme.css')],

  routeRules: {
    '/reading/demo': { ssr: false },
    '/reading/stories/**': { ssr: false },
    '/reading/practice': { ssr: false },
    '/reading/curriculum': { ssr: false },
    '/reading/onboarding': { ssr: false },
    '/reading/dashboard': { ssr: false },
    '/reading/child/**': { ssr: false },
  },
});
