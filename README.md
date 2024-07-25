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
- Icons
  - <https://heroicons.com/>
  - <https://simpleicons.org/>

- Check Google Search Indexing - <https://search.google.com/search-console/>
  - verify the domain via DNS verification

## Great Examples of Nuxt UI Pro

- <https://github.com/nuxt-ui-pro/saas>
- <https://github.com/nuxt-ui-pro/landing>


## Compress images

```bash
# Install Image Optimizers
sudo apt-get install optipng pngcrush


find . -type f -iname "*.png" -exec optipng -nb -nc {} \;
find . -type f -iname "*.png" -exec pngcrush -nb -nc {} \;