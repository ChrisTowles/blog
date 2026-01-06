/**
 * Nuxt module that fixes nuxt-auth-utils breaking WebSocket upgrades.
 *
 * The issue: nuxt-auth-utils adds a Nitro plugin (ws.js) that calls
 * getUserSession on every request via the 'request' hook. During WebSocket
 * upgrades, event.context isn't initialized, causing:
 * "Cannot read properties of undefined (reading 'sessions')"
 *
 * This module adds a server plugin that initializes event.context before
 * the nuxt-auth-utils plugin runs.
 */
import type { Nuxt } from '@nuxt/schema'
import { defineNuxtModule, addServerPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
    meta: {
        name: 'ws-session-fix',
        configKey: 'wsSessionFix'
    },
    setup(_options: unknown, _nuxt: Nuxt) {
        const { resolve } = createResolver(import.meta.url)

        // Add server plugin - will run before plugins from other modules
        // because this module is loaded first in the modules array
        addServerPlugin(resolve('../../server/plugins/00-ws-session-fix'))
    }
})
