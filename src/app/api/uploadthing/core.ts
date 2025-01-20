import page from "@/app/dashboard/page"
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
        //added ids to pageLevelDocs
        pageLevelDocs.forEach((doc, i) => (doc.id = `${i}`)) // Extract `pageContent`

        const newPageLevelDocs = pageLevelDocs.map((doc) => ({
          id: doc.id,
          text: doc.pageContent,
        }))
        const pagesAmount = pageLevelDocs.length

        //vectorize and indexing

        const pineconeIndex = pc.Index("docubot3")

        const model = "multilingual-e5-large"

        const embeddings = await pc.inference.embed(
          model,
          newPageLevelDocs.map((d) => d.text),
          { inputType: "passage", truncate: "END" }
        )

        const vectors = newPageLevelDocs.map((d, i) => ({
          id: d.id!,
          values: embeddings[i].values!,
          metadata: { text: d.text },
        }))

        console.log("vectors)", vectors)

        await pineconeIndex.namespace(createdFile.id).upsert(vectors)

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
