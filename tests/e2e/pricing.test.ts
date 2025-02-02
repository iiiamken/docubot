import test, { expect } from "@playwright/test"
import { Pricing } from "../pages/pricing.page"

test.describe("test Pricing page", () => {
  test.only("title visible", async ({ page }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const pricingTitle = pricingPage.getPricingTitle()

    await expect(pricingTitle).toBeVisible()
  })
})
