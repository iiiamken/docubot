import { pc } from "@/app/lib/pinecode"
import { SendMessageValidator } from "@/app/lib/SendMessageValidator"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  // endpoint for asking a question to a pdf file

  const body = await req.json()

  const { getUser } = getKindeServerSession()
  const user = getUser()

  const { id: userId } = await user

  if (!userId) return new Response("Unauthorized", { status: 401 })

  const { fileId, message } = SendMessageValidator.parse(body)

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  })

  if (!file) return new Response("Not found", { status: 404 })

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileId,
    },
  })

  //1. vectorize message
  const pineconeIndex = pc.Index("docubot3")
  const model = "multilingual-e5-large"

  const query = [message]
  console.log(query)

  const embedding = await pc.inference.embed(model, query, {
    inputType: "query",
  })

  const queryResponse = await pineconeIndex.namespace(file.id).query({
    topK: 3,
    vector: embedding[0].values!,
    includeValues: false,
    includeMetadata: true,
  })

  const prevMessages = await db.message.findMany({
    where: {
      fileId,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 6,
  })

  //2. send to openAI to get response
}
