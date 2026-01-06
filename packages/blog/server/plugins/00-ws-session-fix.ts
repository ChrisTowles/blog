/**
 * Fix for nuxt-auth-utils breaking WebSocket upgrades.
 *
 * The issue: h3's session handling expects event.context to exist,
 * but during WebSocket upgrades, the event object doesn't have context
 * initialized, causing: "Cannot read properties of undefined (reading 'sessions')"
 *
 * This plugin patches the global $fetch to intercept WebSocket upgrades.
 * Note: This is a workaround until h3/crossws properly supports session context.
 */
export default defineNitroPlugin((nitroApp) => {
    // Hook into request early to ensure context exists
    nitroApp.hooks.hook('request', (event) => {
        // Ensure context exists
        if (!event.context) {
            (event as any).context = {}
        }
        // Ensure sessions exists
        if (!event.context.sessions) {
            event.context.sessions = {}
        }
    })
})
