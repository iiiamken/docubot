import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  pdfUploader: f({
    image: {
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
      return {}
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
