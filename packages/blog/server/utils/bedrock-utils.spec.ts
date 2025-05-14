
import { describe, test, expect, it } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
// import { bedrock } from '@ai-sdk/amazon-bedrock';
import { generateText } from 'ai';


describe('beckrock-utils', async () => {

  it('poc', async () => {

    const creds = fromNodeProviderChain()
   
    const bedrock = createAmazonBedrock({
      
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      //credentialProvider: creds,
    });

    const model = bedrock('amazon.nova-lite-v1:0',{
      
      
    });
   const prompt = 'Write a vegetarian lasagna recipe for 4 people.'
   
    const { text } = await generateText({
      model: model,
   
      messages: [
        {
          role: 'system',
          content: `You are an expert on William Gibson's cyberpunk literature and themes. You have access to the following academic analysis: ${prompt}`,
          providerOptions: {
            bedrock: { cachePoint: { type: 'default' } },
          },
        },
        {
          role: 'user',
          content:
            'What are the key cyberpunk themes that Gibson explores in Neuromancer?',
        },
      ],
    });

    expect(text).toMatch(/vegetarian lasagna recipe/i)

  })


})


