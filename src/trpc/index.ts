import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query"
import { PLANS } from "@/config/stripe"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { getUserSubscriptionPlan, stripe } from "../lib/stripe"
import { absoluteUrl } from "../lib/utils"
import { privateProcedure, publicProcedure, router } from "./trpc"

export const appRouter = router({
  test: publicProcedure.query(async () => {
    return { success: true }
  }),
  test3: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        given_name: z.string(),
        family_name: z.string(),
        picture: z.string(),
      })
    )
    .query(async ({ input }) => {
      const testUser = input
      if (!testUser) {
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        if (!user || !user.id || !user.email)
          throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      return { success: true, testUser }
    }),
  test1: publicProcedure
    .input(
      z.object({
        test: z.string(),
      })
    )
    .query(async ({ input }) => {
      return { success: true, input }
    }),
  test2: publicProcedure
    .input(
      z.object({
        test: z.string(),
      })
    )
    .mutation(async ({ input: { test } }) => {
      return { success: true, test }
    }),
  test4: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        given_name: z.string(),
        family_name: z.string(),
        picture: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return { success: true, input }
    }),
  test5: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        given_name: z.string(),
        family_name: z.string(),
        picture: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const testUser = input
      if (!testUser) {
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        if (!user || !user.id || !user.email)
          throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      return { success: true, testUser }
    }),
  authCallback: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        given_name: z.string(),
        family_name: z.string(),
        picture: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const testUser = input
      if (!testUser) {
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        if (!user || !user.id || !user.email)
          throw new TRPCError({ code: "UNAUTHORIZED" })

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
      }

      const dbUser = await db.user.findFirst({
        where: {
          id: testUser.id,
        },
      })

      if (!dbUser) {
        await db.user.create({
          data: {
            id: testUser.id,
            email: testUser.email,
          },
        })
      }

      return { success: true, dbUser }
    }),
  getUserFiles: privateProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        given_name: z.string(),
        family_name: z.string(),
        picture: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let submitUser
      const data = input.id
      submitUser = data

      if (!data) {
        const { userId } = ctx
        submitUser = userId
      }

      const files = await db.file.findMany({
        where: {
          userId: submitUser,
        },
      })

      const filesWithCount = await Promise.all(
        files.map(async (file) => {
          const messageCount = await db.message.count({
            where: { fileId: file.id, userId: submitUser },
          })

          return { ...file, messageCount }
        })
      )

      return filesWithCount
    }),
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      })
      if (!file) {
        throw new TRPCError({ code: "NOT_FOUND" })
      }

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
  createStripeSession: privateProcedure.mutation(async ({ ctx }) => {
    const { userId } = ctx

    const billingUrl = absoluteUrl("/dashboard/billing")

    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" })

    const dbUser = await db.user.findFirst({
      where: {
        id: userId,
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
          price: PLANS.find((plan) => plan.name === "Pro")?.price.priceIds.test,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
    })

    return { url: stripeSession.url }
  }),
})

export type AppRouter = typeof appRouter
