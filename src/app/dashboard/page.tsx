import Dashboard from "@/components/Dashboard"
import { db } from "@/db"
import { getUserSubscriptionPlan } from "@/lib/stripe"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const Page = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  console.log(
    "DASHBOARDuseruseruDASHBOARDseruseruseruDASHBOARDseruseruseruDASHBOARDseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruser",
    user
  )
  // if (!user || !user.id) redirect("/auth-callback?origin=dashboard")
  if (!user || !user.id) console.log("hello")
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  })
  console.log(
    "dbUserDASHBOARDdbUserDASHBOARDdbUserDASHBOARDdbUserDASHBOARDdbUserDASHBOARDdbUserDASHBOARDdbUserDASHBOARD",
    dbUser
  )
  // if (!dbUser) redirect("/auth-callback?origin=dashboard")
  if (!dbUser) return console.log("Hi again")
  const subscriptionPlan = await getUserSubscriptionPlan()

  return <Dashboard subscriptionPlan={subscriptionPlan} />
}

export default Page
