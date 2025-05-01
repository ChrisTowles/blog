// src/module.ts

export default defineNuxtModule({
  meta: {
    name: 'my-module'
  },
  async setup(options, nuxt) {
    nuxt.hook('mcp:setup', ({ mcp }) => {
      // Setup your MCP tools here
      // For example
      mcp.tool('get-nuxt-root', 'Get the Nuxt root path', {}, async () => {
        return {
          content: [{
            type: 'text',
            text: nuxt.options.rootDir
          }]
        }
      })
    })
  }
})
