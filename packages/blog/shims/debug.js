// Browser-compatible shim for 'debug' package
// This provides proper ESM default export for the CJS 'debug' module

// Minimal debug implementation for browser
function createDebug(namespace) {
  const enabled = typeof localStorage !== 'undefined' &&
    localStorage.getItem('debug')?.includes(namespace)

  function debug(...args) {
    if (!enabled) return
    const time = new Date().toISOString()
    console.log(`[${time}] ${namespace}:`, ...args)
  }

  debug.enabled = enabled
  debug.namespace = namespace
  debug.extend = (suffix) => createDebug(`${namespace}:${suffix}`)
  debug.log = console.log.bind(console)

  return debug
}

// Static methods
createDebug.enable = (namespaces) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('debug', namespaces)
  }
}

createDebug.disable = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('debug')
  }
}

createDebug.enabled = (namespace) => {
  if (typeof localStorage === 'undefined') return false
  const debug = localStorage.getItem('debug') || ''
  return debug.includes(namespace) || debug === '*'
}

createDebug.names = []
createDebug.skips = []
createDebug.formatters = {}

export default createDebug
export { createDebug as debug }
