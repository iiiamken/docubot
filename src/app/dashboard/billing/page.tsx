import { getUserSubscriptionPlan } from "@/lib/stripe"
import BillingForm from "@/components/Billingform"

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan()
  if (!subscriptionPlan) return <div></div>

  return <BillingForm subscriptionPlan={subscriptionPlan} />
}

export default Page
