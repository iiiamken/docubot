import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query"
import { PLANS } from "@/config/stripe"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { getUserSubscriptionPlan, stripe } from "../lib/stripe"
import { absoluteUrl } from "../lib/utils"
import { privateProcedure, publicProcedure, router } from "./trpc"

const authFn = async function (input?: {
  id?: string
  email?: string
  given_name?: string
  family_name?: string
  picture?: string
}) {
  let submitUserId
  submitUserId = input?.id

  if (!input?.id) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id || !user.email)
      throw new TRPCError({ code: "UNAUTHORIZED" })
    submitUserId = user.id
  }

  if (!submitUserId) throw new TRPCError({ code: "UNAUTHORIZED" })

  const dbUser = await db.user.findFirst({
    where: {
      id: submitUserId,
    },
  })
  if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" })
  return { ...input, id: submitUserId }
}

export const appRouter = router({
  authCallback: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        email: z.string().optional(),
        given_name: z.string().optional(),
        family_name: z.string().optional(),
        picture: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await authFn(input)

      if (!user.email) throw new TRPCError({ code: "UNAUTHORIZED" })

      const dbUser = await db.user.findFirst({
        where: {
          id: user.id,
        },
      })

      if (!dbUser) {
        await db.user.create({
          data: {
            id: user.id,
            email: user.email,
          },
        })
      }

      return { success: true, dbUser }
    }),
  getUserFiles: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        email: z.string().optional(),
        given_name: z.string().optional(),
        family_name: z.string().optional(),
        picture: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await authFn(input)

      const files = await db.file.findMany({
        where: {
          userId: user.id,
        },
      })

      if (!files) throw new TRPCError({ code: "NOT_FOUND" })

      const filesWithCount = await Promise.all(
        files.map(async (file) => {
          const messageCount = await db.message.count({
            where: { fileId: file.id, userId: user.id, isUserMessage: true },
          })

          return { ...file, messageCount }
        })
      )

      return filesWithCount
    }),
  deleteFile: publicProcedure
    .input(
      z.object({
        fileId: z.string(),
        user: z
          .object({
            id: z.string().optional(),
            email: z.string().optional(),
            given_name: z.string().optional(),
            family_name: z.string().optional(),
            picture: z.string().optional(),
          })
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await authFn(input.user)
      if (!input.fileId) throw new TRPCError({ code: "UNAUTHORIZED" })

      const file = await db.file.findFirst({
        where: {
          id: input.fileId,
          userId: user.id,
        },
      })
      if (!file) {
        throw new TRPCError({ code: "NOT_FOUND" })
      }

      await db.file.delete({
        where: {
          id: input.fileId,
        },
      })
      return file
    }),
  getFile: publicProcedure
    .input(
      z.object({
        key: z.string(),
        user: z
          .object({
            id: z.string().optional(),
            email: z.string().optional(),
            given_name: z.string().optional(),
            family_name: z.string().optional(),
            picture: z.string().optional(),
          })
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await authFn(input.user)
      if (!input.key) throw new TRPCError({ code: "UNAUTHORIZED" })

      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId: user.id,
        },
      })
      if (!file) {
        throw new TRPCError({ code: "NOT_FOUND" })
      }
      return file
    }),
  getFileUploadStatus: publicProcedure
    .input(
      z.object({
        fileId: z.string(),
        user: z
          .object({
            id: z.string().optional(),
            email: z.string().optional(),
            given_name: z.string().optional(),
            family_name: z.string().optional(),
            picture: z.string().optional(),
          })
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await authFn(input.user)

      if (!input.fileId) throw new TRPCError({ code: "UNAUTHORIZED" })

      const file = await db.file.findFirst({
        where: {
          id: input.fileId,
          userId: user.id,
        },
      })

      if (!file) return { status: "PENDING" as const }

      return { status: file.uploadStatus }
    }),
  getFileMessages: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        fileId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { userId } = ctx
      const { fileId, cursor } = input
      const limit = input?.limit ?? INFINITE_QUERY_LIMIT

      const file = await db.file.findFirst({
        where: { userId, id: fileId },
      })

      if (!file) throw new TRPCError({ code: "NOT_FOUND" })

      const messages = await db.message.findMany({
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

      let nextCursor: typeof cursor | undefined = undefined
      if (messages.length > limit) {
        const nextItem = messages.pop()
        nextCursor = nextItem?.id
      }

      return { messages, nextCursor }
    }),
  createStripeSession: publicProcedure
    .input(
      z
        .object({
          id: z.string().optional(),
          email: z.string().optional(),
          given_name: z.string().optional(),
          family_name: z.string().optional(),
          picture: z.string().optional(),
        })
        .optional()
    )
    .mutation(async ({ input }) => {
      const user = await authFn(input)
      const billingUrl = absoluteUrl("/dashboard/billing")

      const dbUser = await db.user.findFirst({
        where: {
          id: user.id,
        },
      })

      if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" })

      const subscriptionPlan = await getUserSubscriptionPlan()

      if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: dbUser.stripeCustomerId,
          return_url: "https://dokubot.vercel.app/dashboard/billing",
        })
        const stripeUrl = { url: stripeSession.url }

        return stripeUrl
      }

      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        line_items: [
          {
            price: PLANS.find((plan) => plan.name === "Pro")?.price.priceIds
              .test,
            quantity: 1,
          },
        ],
        metadata: {
          userId: user.id,
        },
      })

      return { url: stripeSession.url }
    }),
})

export type AppRouter = typeof appRouter
