---
title: Migrate Vue 2 with Vuetify and Jest to Vite and Vitest
date: 2022-01-09T16:00:00.000+00:00
lang: en
duration: 15 min
---

# {{ $frontmatter.title }}

So my main project at work is a [Vue 2](https://vuejs.org/) and [Vuetify 2](https://vuetifyjs.com/) site, but privately I have been playing with [Vue [3](https://vuejs.org/) and loved the [Composition API](https://staging.vuejs.org/guide/introduction.html#api-styles) to avoid `mixins`. Due to some new features, we are planning to build soon. I wanted to write it in `Vue 3`, to prevent needing to migrate it later.

<!-- more -->

I wanted to investigate how to migrate from `Vue 2` to `Vue 3`. I planned to use the amazing [Migration Build](https://v3.vuejs.org/guide/migration/migration-build.html) to allow `Vue 3` to use most `Vue 2` components during a migration period. Which is much less risky for a large project.

I took a rough hack at doing the migration leaving only a handful of pages to test over a day to see how likely the migration was. I had to upgrade `Vuetify` from `2.X.X` to an early beta version of `3.X.X`. However I was unable to get anything more than a few `v-cards` and `v-btn` was working. A peer on another work team had said as much but I hadn't listened. My bad.

## Vuetify 3 is not ready of 2021-12-18

Unfortunately, `Vuetify` is not ready for `Vue 3` as of 2021-12-18. I tried the beta [@vuetify/[nightly](https://www.npmjs.com/package/@vuetify/nightly) but it's far from ready. The documentation said it's to ship in February but looking at the missing functionality I doubted it.

I joined the discord community and got caught up on the most recent updates. Basicity it's going to take a little longer which is ok. It's open source and it's not like I've contributed any pull requests. It's been a great framework and recommend it to everyone.

I'll update this post when it is ready and has support for `Vue 3`.

## Original Goal - Vue 3

So the dream would be to get to `vue 3` but that's not practical without `Vuetify`.  That leaves two options:

- Replace `Vuetify` with a different component framework
- Don't upgrade to `Vue 3` and keep `Vuetify 2.X.X`
  - Upgrade to v3 once it's ready

To be clear, replacing `Vuetify` has almost no upside for my employer.

- It would take a lot of time to convert the large codebase.
- It is likely to introduce bugs
- No improvement for the user
- Time and effort retraining the team.
- Moving away from a framework others in the company already also uses.

So it's pretty easy to decide to wait on migrating to `Vue 3` and `Vuetify 3`.

## New Goal - Vite and Composition API with vue 2

Thinking about the problem I realized that also of the migration and benefits of the migration to `vue 3` was the improvement of the tooling. [Vite](https://vitejs.dev/guide/why.html) is so fast you have to see to believe. I follow [Evan You](https://twitter.com/youyuxi) and [Anthony Fu](https://twitter.com/antfu7) on twitter so have been watching it come to life.

So I decided to try to migrate to `vite` and allow the [@vue/composition-api](https://github.com/vuejs/composition-api) with `vue 2`. This would also make it easier to upgrade to `Vue 3` once it's ready.

So the new goal looks like this.

- keep `vue 2` and `vuetify 2.X.X`
- remove `@vue/cli-service`
- remove `webpack`
- remove `babel`
- add `vite`
- add `@vue/composition-api`

This gives a lot of benefits and a clear upgrade path!

It was pretty easy to clone a simple example repo with `vue 2` and `vuetify 2.X.X` with `@vue/cli-service`. and tested out the upgrade there.

Once that worked I then did the upgrade on the more complex monorepo at work.

## Update 2022-07-012

With [Vue 2.7 "Naruto" Released](https://blog.vuejs.org/posts/vue-2-7-naruto.html) I'm now on `Vue 2.7` and was able to remove the [@vue/composition-api](https://github.com/vuejs/composition-api)!
