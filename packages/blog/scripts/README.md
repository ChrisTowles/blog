# Cloudflare AI API Script

This TypeScript script demonstrates how to use the Cloudflare AI API to invoke AI models using the REST API endpoints.

## Prerequisites

1. **Cloudflare Account**: You need a Cloudflare account with Workers AI enabled
2. **API Token**: Get your API token from the Cloudflare dashboard
3. **Account ID**: Your Cloudflare account ID
4. **Wrangler CLI**: Installed and authenticated

## Setup

1. Set the required environment variables:
   ```bash
   export CLOUDFLARE_API_TOKEN="your-api-token"
   export CLOUDFLARE_ACCOUNT_ID="your-account-id"
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Usage

Run the example script:
```bash
pnpm ai-example
```

Or execute directly:
```bash
tsx scripts/cloudflare-ai-example.ts
```

## Features

- **Simple Chat Completion**: Basic AI model invocation
- **Streaming Responses**: Real-time streaming AI responses  
- **Code Generation**: Specialized prompts for code generation
- **Comprehensive Error Handling**: Proper error handling and logging
- **TypeScript Types**: Full type definitions for the API

## Available Models

The script uses `@cf/meta/llama-3.1-8b-instruct` by default, but you can use any supported Cloudflare AI model:

- `@cf/meta/llama-3.1-8b-instruct`
- `@cf/meta/llama-3.1-70b-instruct`
- `@cf/microsoft/wizardlm-7b-instruct`
- `@cf/mistral/mistral-7b-instruct-v0.1`
- And many more...

## API Reference

### Functions

#### `getCloudflareToken()`
Retrieves the Cloudflare API token from environment variables.

#### `invokeCloudflareAI(accountId, modelName, request, token)`
Invokes a Cloudflare AI model with a single response.

#### `invokeCloudflareAIStream(accountId, modelName, request, token)`
Invokes a Cloudflare AI model with streaming response.

### Types

#### `CloudflareAIRequest`
```typescript
interface CloudflareAIRequest {
  messages: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
  }>
  max_tokens?: number
  temperature?: number
  top_p?: number
  stream?: boolean
}
```

#### `CloudflareAIResponse`
```typescript
interface CloudflareAIResponse {
  result: {
    response: string
  }
  success: boolean
  errors: any[]
  messages: any[]
}
```

## Examples

### Basic Chat
```typescript
const request: CloudflareAIRequest = {
  messages: [
    { role: 'user', content: 'Hello, how are you?' }
  ],
  max_tokens: 100
}

const response = await invokeCloudflareAI(accountId, modelName, request, token)
console.log(response.result.response)
```

### Streaming Response
```typescript
const request: CloudflareAIRequest = {
  messages: [
    { role: 'user', content: 'Tell me a story' }
  ],
  max_tokens: 500,
  stream: true
}

await invokeCloudflareAIStream(accountId, modelName, request, token)
```

## Error Handling

The script includes comprehensive error handling for:
- Missing environment variables
- API authentication failures
- Network errors
- JSON parsing errors
- Streaming response errors

## Security Notes

- Never commit API tokens to version control
- Use environment variables for sensitive configuration
- Implement rate limiting for production use
- Monitor API usage and costs

## Resources

- [Cloudflare AI API Documentation](https://developers.cloudflare.com/api/resources/ai/methods/run/)
- [Cloudflare Workers AI Models](https://developers.cloudflare.com/workers-ai/models/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)