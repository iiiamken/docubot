import { pc } from "@/lib/pinecode"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { PLANS } from "@/config/stripe"
import { getUserSubscriptionPlan } from "@/lib/stripe"

const f = createUploadthing()
const middleware = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) {
    throw new Error("UNAUTHORIZED")
  }

  const subscriptionPlan = await getUserSubscriptionPlan()

  return { subscriptionPlan, userId: user.id }
}

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>
  file: {
    key: string
    name: string
    url: string
  }
}) => {
  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  })
  if (isFileExist) return

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

    const pagesAmt = pageLevelDocs.length

    const { subscriptionPlan } = metadata
    const { isSubscribed } = subscriptionPlan

    const isProExceeded =
      pagesAmt > PLANS.find((plan) => plan.name === "Pro")!.pagesPerPdf
    const isFreeExceeded =
      pagesAmt > PLANS.find((plan) => plan.name === "Free")!.pagesPerPdf

    if ((isSubscribed && isProExceeded) || (!isSubscribed && isFreeExceeded)) {
      await db.file.update({
        data: {
          uploadStatus: "FAILED",
        },
        where: {
          id: createdFile.id,
        },
      })
      return
    }
    pageLevelDocs.forEach((doc, i) => (doc.id = `${i}`))

    const newPageLevelDocs = pageLevelDocs.map((doc) => ({
      id: doc.id,
      text: doc.pageContent,
    }))

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
    console.log(err)
    await db.file.update({
      where: {
        id: createdFile.id,
      },
      data: {
        uploadStatus: "FAILED",
      },
    })
  }
}
export const ourFileRouter = {
  freePlanUploader: f({
    pdf: {
      maxFileSize: "4MB",
    },
  })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({
    pdf: {
      maxFileSize: "16MB",
    },
  })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
