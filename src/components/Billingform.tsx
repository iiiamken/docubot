"use client"

import { trpc } from "@/app/_trpc/client"
import { getUserSubscriptionPlan } from "@/app/lib/stripe"
import { useToast } from "@/hooks/use-toast"

interface BillingformProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const Billingform = ({ subscriptionPlan }: BillingformProps) => {
  const { toast } = useToast()
  const {} = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      if (url) window.location.href = url
      if (!url) {
        toast({
          title: "There was a problem...",
          description: "Please try again in a moment",
          variant: "destructive",
        })
      }
    },
  })
}

export default Billingform
