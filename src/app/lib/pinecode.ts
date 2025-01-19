import { PineconeClient } from "@pinecone-database/pinecone"

const client = new PineconeClient()

await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: "us-west1-gcp",
})
