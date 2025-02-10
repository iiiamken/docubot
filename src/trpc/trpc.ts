import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { initTRPC, TRPCError } from "@trpc/server"

const t = initTRPC.create()
const middleware = t.middleware

// type inputType = {
//   id?: string
//   email?: string
//   given_name?: string
//   family_name?: string
//   picture?: string
// }

const isAuth = middleware(async (opts) => {
  // const inputdata = opts.getRawInput() as inputType

  // if (!inputdata) {
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
  // }
  // return opts.next({
  //   ctx: {
  //     userId: inputdata.id,
  //     user: inputdata,
  //   },
  // })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
