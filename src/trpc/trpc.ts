import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { initTRPC, TRPCError } from "@trpc/server"
import { appRouter } from "."

const t = initTRPC.create()
const { createCallerFactory } = t
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  })
})
export const createCaller = createCallerFactory(appRouter)

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
