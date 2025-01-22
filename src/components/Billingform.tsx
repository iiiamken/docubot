"use client"

import { getUserSubscriptionPlan } from "@/app/lib/stripe"

interface BillingformProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const Billingform = ({ subscriptionPlan }: BillingformProps) => {}

export default Billingform
