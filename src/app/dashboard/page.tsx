import Dashboard from "@/components/Dashboard"
import { getUserSubscriptionPlan } from "@/lib/stripe"

const Page = async () => {
  // const { getUser } = getKindeServerSession()
  // const user = await getUser()
  // console.log(
  //   "DASHBOARDuseruseruDASHBOARDseruseruseruDASHBOARDseruseruseruDASHBOARDseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruser",
  //   user
  // )
  // if (!user || !user.id) redirect("/")

  // const dbUser = await db.user.findFirst({
  //   where: {
  //     id: user.id,
  //   },
  // })
  // console.log(
  //   "dbUserDASHBOARDdbUserDASHBOARDdbUserDASHBOARDdbUserDASHBOARDdbUserDASHBOARDdbUserDASHBOARDdbUserDASHBOARD",
  //   dbUser
  // )
  // if (!dbUser) redirect("/")

  const subscriptionPlan = await getUserSubscriptionPlan()

  return <Dashboard subscriptionPlan={subscriptionPlan} />
}

export default Page
