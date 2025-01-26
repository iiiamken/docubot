// import { appRouter } from "@/trpc"
// import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

// const handler = (req: Request) =>
//   fetchRequestHandler({
//     endpoint: "https://dokubot.vercel.app/dashboard/api/trpc",
//     req,
//     router: appRouter,
//     createContext: () => ({}),
//   })

// export { handler as GET, handler as POST }
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@/trpc"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }
