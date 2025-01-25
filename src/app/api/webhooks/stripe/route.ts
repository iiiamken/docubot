import { db } from "@/db"
import { stripe } from "@/lib/stripe"
import type Stripe from "stripe"

export async function POST(request: Request) {
  const body = await request.text()
  console.log(
    "bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody",
    body
  )
  console.log(
    "request.headersrequest.headersrequest.headersrequest.headersrequest.headersrequest.headersrequest.headers",
    request.headers
  )
  const signature = request.headers.get("stripe-Signature") ?? ""

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    )
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    )
  }
  console.log(
    "eventeventeventeventeventeventeventeventeventeventeventeventeventeventeventeventevent",
    event
  )
  const session = event.data.object as Stripe.Checkout.Session

  if (!session?.metadata?.userId) {
    return new Response(null, {
      status: 200,
    })
  }
  console.log(
    "event.typeevent.typeevent.typeevent.typeevent.typeevent.typeevent.typeevent.typeevent.typeevent.typeevent.typeevent.typeevent.typeevent.typeevent.type",
    event.type
  )
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )
    console.log(
      "subscriptioncompletedsubscriptioncompletedsubscriptioncompletedsubscriptioncompletedsubscriptioncompletedsubscriptioncompletedsubscriptioncompletedsubscriptioncompletedsubscriptioncompletedsubscriptioncompleted",
      subscription
    )

    await db.user.update({
      where: {
        id: session.metadata.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )
    console.log(
      "subscriptionSUCCEEDEDsubscriptionSUCCEEDEDsubscriptionSUCCEEDEDsubscriptionSUCCEEDEDsubscriptionSUCCEEDED,subscriptionSUCCEEDEDsubscriptionSUCCEEDEDsubscriptionSUCCEEDEDsubscriptionSUCCEEDEDsubscriptionSUCCEEDED",
      subscription
    )

    await db.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  return new Response(null, { status: 200 })
}
