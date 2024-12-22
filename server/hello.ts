export default defineEventHandler((event) => {
    console.log('Hello from Nitro!')
    console.log(event)
    return {
        hello: 'world' + new Date(),
    }
})
