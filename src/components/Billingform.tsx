"use client"

import { trpc } from "@/app/_trpc/client"
import { getUserSubscriptionPlan } from "@/app/lib/stripe"
import { useToast } from "@/hooks/use-toast"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface BillingformProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const Billingform = ({ subscriptionPlan }: BillingformProps) => {
  const { toast } = useToast()
  const { mutate: createStripeSession, isLoading } =
    trpc.createStripeSession.useMutation({
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
  return (
    <MaxWidthWrapper>
      <form
        className="mt-12"
        onSubmit={(e) => {
          e.preventDefault()
          createStripeSession()
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              You are on the <strong>{subscriptionPlan.name}</strong> plan
            </CardDescription>
          </CardHeader>
        </Card>
      </form>
    </MaxWidthWrapper>
  )
}

export default Billingform
