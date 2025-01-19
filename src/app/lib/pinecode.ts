// import { PineconeClient } from "@pinecone-database/pinecone"

// export const getPineconeClient = async () => {
//   const client = new PineconeClient()

//   await client.init({
//     apiKey: process.env.PINECONE_API_KEY!,
//     environment: "us-east1-aws",
//   })

//   return client
// }

import { Pinecone } from "@pinecone-database/pinecone"

export const pc = new Pinecone({
  apiKey: "YOUR_API_KEY",
})
