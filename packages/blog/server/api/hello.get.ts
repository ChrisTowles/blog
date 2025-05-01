export default defineEventHandler(() => {
  console.log('Hello from Nitro!')
  return {
    hello: 'world' + new Date()
  }
})
