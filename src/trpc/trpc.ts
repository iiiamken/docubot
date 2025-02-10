import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { initTRPC, TRPCError } from "@trpc/server"

const t = initTRPC.create()
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
  // 1
  // const input = opts.getRawInput
  //
  // 2
  // const input = opts.getRawInput as unknown as { id: string }
  //
  //3
  // const input = opts.getRawInput as {
  //   id?: string
  //   email?: string
  //   given_name?: string
  //   family_name?: string
  //   picture?: string
  // }
  const input = (await opts.input) as {
    id?: string
    email?: string
    given_name?: string
    family_name?: string
    picture?: string
  }

  if (!input.id) {
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
