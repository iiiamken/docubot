import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { PLANS } from "@/config/stripe"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { ToastProvider } from "@radix-ui/react-toast"

const pricingItems = [
  {
    plan: "Free",
    tagline: "For small side projects.",
    quota: 10,
    features: [
      {
        text: "5 pages per PDF",
        footnote: "The maximum amount of pages per PDF-file.",
      },
      {
        text: "4MB file size limit",
        footnote: "The maximum file size of a single PDF file.",
      },
      {
        text: "Mobile-friendly interface",
      },
      {
        text: "Higher-quality responses",
        footnote: "Better algorithmic responses for enhanced content quality",
        negative: true,
      },
      {
        text: "Priority support",
        negative: true,
      },
    ],
  },
  {
    plan: "Pro",
    tagline: "For larger projects with higher needs.",
    quota: PLANS.find((p) => p.slug === "pro")!.quota,
    features: [
      {
        text: "25 pages per PDF",
        footnote: "The maximum amount of pages per PDF-file.",
      },
      {
        text: "16MB file size limit",
        footnote: "The maximum file size of a single PDF file.",
      },
      {
        text: "Mobile-friendly interface",
      },
      {
        text: "Higher-quality responses",
        footnote: "Better algorithmic responses for enhanced content quality",
      },
      {
        text: "Priority support",
      },
    ],
  },
]

const Page = () => {
  //check login
  const { getUser } = getKindeServerSession()
  const user = getUser()

  return (
    <MaxWidthWrapper className="mb-8 mt-24 text-center max-w-5xl">
      <div className="mx-auto mb-10 sm:max-w-lg">
        <h1 className="text-6xl font-bold sm:text-7xl">Pricing</h1>
        <p className="mt-5 text-gray-600 sm:text-lg">
          Whether you&apos;re just trying out our service or need more,
          we&apos;ve got you covered.
        </p>
      </div>
      <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ToastProvider></ToastProvider>
      </div>
    </MaxWidthWrapper>
  )
}
export default Page
