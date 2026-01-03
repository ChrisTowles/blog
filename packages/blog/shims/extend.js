// Browser-compatible shim for 'extend' package
// This provides proper ESM default export for the CJS 'extend' module

// Simple deep extend implementation
function extend(deep, target, ...sources) {
  // Handle case where deep is not a boolean (old API compatibility)
  if (typeof deep !== 'boolean') {
    sources.unshift(target)
    target = deep
    deep = false
  }

  if (target == null) target = {}

  for (const source of sources) {
    if (source == null) continue

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const srcVal = source[key]
        const tgtVal = target[key]

        if (deep && srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal)) {
          target[key] = extend(true, tgtVal && typeof tgtVal === 'object' ? tgtVal : {}, srcVal)
        } else if (srcVal !== undefined) {
          target[key] = srcVal
        }
      }
    }
  }

  return target
}

export default extend
export { extend }
