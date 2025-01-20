import { pc } from "@/app/lib/pinecode"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { OpenAIEmbeddings } from "@langchain/openai"
import { PineconeStore } from "@langchain/pinecone"
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession()
      const user = await getUser()

      if (!user || !user.id) {
        throw new Error("UNAUTHORIZED")
      }
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: file.url,
          uploadStatus: "PROCESSING",
        },
      })

      try {
        const response = await fetch(file.url)
        const blob = await response.blob()

        const loader = new PDFLoader(blob)

        const pageLevelDocs = await loader.load()

        const pagesAmount = pageLevelDocs.length

        //vectorize and indexing

        // const pineconeIndex = pc.Index("docubot")

        // const embeddings = new OpenAIEmbeddings({
        //   openAIApiKey: process.env.OPENAI_API_KEY,
        // })

        // await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
        //   pineconeIndex,
        //   namespace: createdFile.id,
        // })

        await db.file.update({
          where: {
            id: createdFile.id,
          },
          data: {
            uploadStatus: "SUCCESS",
          },
        })
      } catch (err) {
        await db.file.update({
          where: {
            id: createdFile.id,
          },
          data: {
            uploadStatus: "FAILED",
          },
        })
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
