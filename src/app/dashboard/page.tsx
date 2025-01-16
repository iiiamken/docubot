import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const page = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  //make sure user is logged in
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard")

  //check if user is in db
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  })
  //redirect if user is not in db
  if (!dbUser) redirect("/auth-callback?origin=dashboard")

  return <h1>Dashboard</h1>
}

export default page
