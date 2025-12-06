export default defineNitroPlugin(() => {
  // Skip in local dev mode
  if (import.meta.dev) {
    console.log('='.repeat(10) + ' Skipping startup log in dev mode ' + '='.repeat(10))
    return
  }

  console.log('='.repeat(60))
  console.log('SERVER STARTUP - Environment Variables')
  console.log('='.repeat(60))

  const env = process.env
  const sortedKeys = Object.keys(env).sort()

  for (const key of sortedKeys) {
    // Mask sensitive values
    const isSensitive = key.toLowerCase().includes('secret')
      || key.toLowerCase().includes('password')
      || key.toLowerCase().includes('key')
      || key.toLowerCase().includes('token')

    let value = env[key] ?? ''
    if (isSensitive && value.length >= 4) {
      value = `${value.slice(0, 2)}***${value.slice(-2)}`
    } else if (isSensitive) {
      value = '***'
    }

    console.log(`${key}=${value}`)
  }

  console.log('='.repeat(60))
})
