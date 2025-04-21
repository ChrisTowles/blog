# NuxtHub Notes

## .nuxtrc

include `hub.workers=true`


## can't exstablish connection with hubAI

### Checks
 - did you create AI Gateway
 - did you set `NUXT_CLOUDFLARE_GATEWAY_ID`
 - did you add `"hub": { "ai" : true }` to you nuxt config.
 - have you run nuxthub link
 - did you run nuxthub dev with `--remote` option.
    - this isn't a documented feature yet. 



```json
{
    "error": true,
    "url": "http://localhost:3001/api/chats/536a6f2c-5b03-4686-b665-9bd482ba1d72",
    "statusCode": 401,
    "statusMessage": "Cloudflare API error",
    "message": "Authentication error",
    "data": {
        "error": true,
        "url": "https://admin.hub.nuxt.com/api/projects/YOUR_WORKER_NAME/ai/run",
        "statusCode": 401,
        "statusMessage": "Cloudflare API error",
        "message": "Authentication error",
        "data": [
            {
                "code": 10000,
                "message": "Authentication error"
            }
        ]
    },
    "stack": [
        "Authentication error",
        "at createError ....."
    ]
}
 ``` 

 

Inorder for the local `hubAI()` to work normally in wrangler you'd have to run `wrangler dev` in order do local development calling the cloudflare AI Gateway. With the nuxthub you do the same but with `nuxt dev --remote`. That will link to the enviroment and route hubAI() to the gateway via NuxtHub. As of 2025-04-20 this was the casue as the documentation isn't todate for the NuxtHub AI feature as its bleeding edge! But it works and i should go submit a PR to help....





