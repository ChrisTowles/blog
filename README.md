# Chris Towles Blog

![cicd badge](https://github.com/ChrisTowles/blog/actions/workflows/ci.yml/badge.svg?branch=main)

This is just my personal blog at <https://Chris.Towles.dev>

## Blog Tech Stack

- [Nuxt](https://nuxtjs.org/)
  - using nuxt-content
- [Nuxt UI Pro](https://ui.nuxt.com/)
  - Paid for [Nuxt UI Pro](https://ui.nuxt.com/) ($249)
    - First, any time I spend doing CSS and even Tailwind is time wasted.
    - Happy to give back to NuxtLabs, I've used so much from [Anthfu](https://github.com/antfu), [Daniel Roe](https://github.com/danielroe) and Vue and Nuxt core members.
- Cloudflare
  - Paid for Cloudflare ($5 Monthly)
  - can likely go back to free but ran over the 1mb file limit.
- [NuxtHub](https://hub.nuxt.com/)
  - this switched hosting to cloudflare workers from cloudflare pages.
  - AI
    - hubAI() is disabled: link a project with `npx nuxthub link` to run AI models in development mode.
- [Nuxt Chat](https://github.com/nuxt-ui-pro/chat)
  - using the Nuxt UI Pro Chat Template
- Icons
  - <https://heroicons.com/>
  - <https://simpleicons.org/>


- [@ai-sdk/vue](https://sdk.vercel.ai/docs/getting-started/nuxt)

- GitHub OAuth client ID - Setup 
 - https://github.com/settings/developers
 - https://nuxt.com/modules/auth-utils


- Check Google Search Indexing - <https://search.google.com/search-console/>
  - verify the domain via DNS verification

## Great Examples of Nuxt UI Pro

- <https://github.com/nuxt-ui-pro/saas>
- <https://github.com/nuxt-ui-pro/landing>


## Compress images

```bash
# Install Image Optimizers
sudo apt-get install pngquant -y

# Run the following command to optimize all PNG files in your project:
find . -name '*.png' -exec pngquant --ext .png --force 256 {} \;


## Check file sizes
cd public/images
du * | sort -nr

## Compress all PNG files in repo not yet checked in
png-compress() {
  # Get all PNG files not yet committed
  LIST=($(git status -s | cut -c4- | grep .png))
  for file in $LIST
  do
    echo "-- Processing $file..."
    du -h "$file"
    pngquant "$file" --ext .png --force
    du -h "$file"
  done
}

```
