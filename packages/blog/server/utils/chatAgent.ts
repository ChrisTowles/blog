// import { routeAgentRequest, type Schedule } from "agents";

// import { unstable_getSchedulePrompt } from "agents/schedule";
// import { AIChatAgent } from "agents/ai-chat-agent";
// import { createWorkersAI } from 'workers-ai-provider'
// import {
//   createDataStreamResponse,
//   generateId,
//   streamText,
//   type StreamTextOnFinishCallback,
//   type ToolSet,
// } from "ai";

// import { tools, executions } from "./tools";
// import { processToolCalls } from "./utils";

// const { gateway, workersAI } = setupAIWorkers()

// // Cloudflare AI Gateway
// // const openai = createOpenAI({
// //   apiKey: env.OPENAI_API_KEY,
// //   baseURL: env.GATEWAY_BASE_URL,
// // });

// /**
//  * Chat Agent implementation that handles real-time AI chat interactions
//  */
// const model = workersAI("@cf/deepseek-ai/deepseek-r1-distill-qwen-32b")

// export class Chat extends AIChatAgent<Env> {
//   /**
//    * Handles incoming chat messages and manages the response stream
//    * @param onFinish - Callback function executed when streaming completes
//    */

//   async onChatMessage(
//     onFinish: StreamTextOnFinishCallback<ToolSet>,
//     options?: { abortSignal?: AbortSignal }
//   ) {
//     // const mcpConnection = await this.mcp.connect(
//     //   "https://path-to-mcp-server/sse"
//     // );

//     // Collect all tools, including MCP tools
//     const allTools = {
//       ...tools,
//       ...this.mcp.unstable_getAITools(),
//     };

//     // Create a streaming response that handles both text and tool outputs
//     const dataStreamResponse = createDataStreamResponse({
//       execute: async (dataStream) => {
//         // Process any pending tool calls from previous messages
//         // This handles human-in-the-loop confirmations for tools
//         const processedMessages = await processToolCalls({
//           messages: this.messages,
//           dataStream,
//           tools: allTools,
//           executions,
//         });

//         // Stream the AI response using GPT-4
//         const result = streamText({
//           model,
//           system: `You are a helpful assistant that can do various tasks...

// ${unstable_getSchedulePrompt({ date: new Date() })}

// If the user asks to schedule a task, use the schedule tool to schedule the task.
// `,
//           messages: processedMessages,
//           tools: allTools,
//           onFinish: async (args) => {
//             onFinish(
//               args as Parameters<StreamTextOnFinishCallback<ToolSet>>[0]
//             );
//             // await this.mcp.closeConnection(mcpConnection.id);
//           },
//           onError: (error) => {
//             console.error("Error while streaming:", error);
//           },
//           maxSteps: 10,
//         });

//         // Merge the AI response stream with tool execution outputs
//         result.mergeIntoDataStream(dataStream);
//       },
//     });

//     return dataStreamResponse;
//   }
//   async executeTask(description: string, task: Schedule<string>) {
//     await this.saveMessages([
//       ...this.messages,
//       {
//         id: generateId(),
//         role: "user",
//         content: `Running scheduled task: ${description}`,
//         createdAt: new Date(),
//       },
//     ]);
//   }
// }

// /**
//  * Worker entry point that routes incoming requests to the appropriate handler
//  */
// export default {
//   async fetch(request: Request, env: Env, ctx: ExecutionContext) {
//     const url = new URL(request.url);

//     return (

//     // Route the request to our agent via the Agents SDK
//     // This automatically handles routing to the correct agent (coder or solver)
//     // and manages WebSocket connections properly
//       (await routeAgentRequest(request, env, { cors: true })) ||
//       new Response("Agent Not found", { status: 404 })
//     );
//   },
// } satisfies ExportedHandler<Env>;
