import { getUserSubscriptionPlan } from "../lib/stripe"

const Page = () => {
  const subscriptionPlan = getUserSubscriptionPlan()

  return <Billingform subscriptionPlan={subscriptionPlan} />
}

export default Page
