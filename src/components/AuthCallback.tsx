import { trpc } from "@/app/_trpc/client"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const AuthCallback = () => {
  const router = useRouter()
  // const [origin, setOrigin] = useState<string | null>(null)

  // Extract query parameters safely
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search)
  //   setOrigin(params.get("origin"))
  // }, [])
  const searchParams = useSearchParams()
  const origin = searchParams.get("origin")

  const { data, isError, error, isSuccess } =
    trpc.authCallback.useQuery(undefined)

  // Handle success using a `useEffect`
  if (isSuccess && data?.success) {
    router.push(origin ? `/${origin}` : "/dashboard")
  }

  // Handle errors
  if (isError && error?.data?.code === "UNAUTHORIZED") {
    router.push("/sign-in")
  }

  // Render loading state explicitly
  {
    return (
      //   <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <h3 className="font-semibold text-xl">Setting up your account...</h3>
          <p>You will be redirected automatically when completed.</p>
        </div>
      </div>
      //   </Suspense>
    )
  }
}

export default AuthCallback
