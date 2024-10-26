import { ChatOllama } from "@langchain/ollama";

export const llm = new ChatOllama({
  model: "qwen2.5:0.5b",
  temperature: 0,
  maxRetries: 2,
});
