import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { privateProcedure, publicProcedure, router } from "./trpc"
import { TRPCError } from "@trpc/server"
import { db } from "@/db"
import { z } from "zod"
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query"
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
    .mutation(async ({ ctx, input }) => {
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
      await db.file.delete({
        where: {
          id: input.id,
        },
      })
      return file
    }),
  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      // check if file exist
      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      })
      if (!file) {
        throw new TRPCError({ code: "NOT_FOUND" })
      }
      return file
    }),
  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input, ctx }) => {
      const file = await db.file.findFirst({
        where: {
          id: input.fileId,
          userId: ctx.userId,
        },
      })

      if (!file) return { status: "PENDING" as const }

      return { status: file.uploadStatus }
    }),
  getFileMessages: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
      })
    )
    .query((input, ctx) => {
      const { userId } = ctx
      const { fileId, cursor } = input
      const limit = input?.limit ?? INFINITE_QUERY_LIMIT

      const file = db.file.findFirst({
        where: { userId, id: fileId },
      })

      if (!file) throw new TRPCError({ code: "NOT_FOUND" })

      const messages = db.message.findMany({
        take: limit + 1,
        where: { fileId },
        orderBy: { createdAt: "desc" },
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          isUserMessage: true,
          createdAt: true,
          text: true,
        },
      })
    }),
})

export type AppRouter = typeof appRouter
