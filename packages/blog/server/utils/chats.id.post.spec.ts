// import { describe, test, expect, it } from 'vitest'
// import { setup, $fetch } from '@nuxt/test-utils'

// describe('chats-post', async () => {
//   const gateway: GatewayOptions | null = null
//   await setup({
//     host: 'http://localhost:3001', // use the running dev server, couldn't get with working with server started by test-utils, was always missing the remote hubAI binding
//     setupTimeout: 2 * 60 * 1000,
//   })

//   test('call api ', async () => {
//     const chatId = "cid-0123456789";

//     // couldn't find way to call library function directly, so using the api route to test events
//     const result = await $fetch(`/api/chats/${chatId}`, {
//       method: 'POST',
//       body: {
//         model: 'llama-3.3-70b-instruct-fp8-fast',
//         messages: [
//           {
//             role: 'user',
//             content: 'What is the origin of the phrase "Hello, World"?'
//           }
//         ]
//       }
//     })
//     expect(result).toBeOneOf([
//       { title: "Rudolf" },
//       { title: "Rudolph" }
//     ])
//   })
// })
