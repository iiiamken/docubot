import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { initTRPC, TRPCError } from "@trpc/server"

const t = initTRPC.create()
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
  // const input = opts.getRawInput as unknown as {
  //   id: string
  //   email: string
  //   given_name: string
  //   family_name: string
  //   picture: string
  // }
  const input = opts.getRawInput as unknown as { id: string }

  // if (!input.id) return

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!input) {
    if (!user || !user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    return opts.next({
      ctx: {
        userId: user.id,
        user,
      },
    })
  }

  return opts.next({
    ctx: {
      userId: input.id,
      user: input,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
