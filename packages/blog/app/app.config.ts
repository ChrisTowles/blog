// Hoisted (and given an explicit empty `icons`) because Nuxt's node tsconfig
// project types `ui` from @nuxt/ui's devtools schema as `{ icons: object }`
// (nuxt 4.4.8 started type-checking app.config.ts in that project too);
// a fresh inline literal with `colors` fails its excess-property check.
const ui = {
  colors: {
    primary: 'sky',
    neutral: 'zinc',
  },
  icons: {},
};

export default defineAppConfig({
  ui,
  author: {
    name: 'Chris Towles',
    github: 'https://github.com/ChrisTowles',
    twitter: 'https://x.com/Chris_Towles',
    bluesky: 'https://bsky.app/profile/chris-towles.bsky.social',
  },
});
