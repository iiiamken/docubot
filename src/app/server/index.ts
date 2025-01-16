import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { privateProcedure, publicProcedure, router } from "./trpc"
import { TRPCError } from "@trpc/server"
import { db } from "@/db"
import { z } from "zod"
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    //check if user exist
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user.id || !user.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    // check if user is in db
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    })
    // create new user if not exist
    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }
    return { success: true }
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    const files = await db.file.findMany({
      where: {
        userId,
      },
    })
    return files
  }),
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const { userId } = ctx
      //find the file
      const file = db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      })
      //if not throw error
      if (!file) {
        throw new TRPCError({ code: "NOT_FOUND" })
      }

      //delete file
      db.file.delete({
        where: {
          id: input.id,
        },
      })
      return file
    }),
})

export type AppRouter = typeof appRouter
