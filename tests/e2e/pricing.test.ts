import test, { expect } from "@playwright/test"
import { Pricing } from "../pages/pricing.page"
import { regexKindeLogin } from "../test-data/test.data"

test.describe("test Pricing page", () => {
  test("title visible", async ({ page }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const pricingTitle = pricingPage.getPricingTitle()

    await expect(pricingTitle).toBeVisible()
  })

  test("description visible", async ({ page }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const pricingIntro = pricingPage.getPricingIntro()

    await expect(pricingIntro).toBeVisible()
  })

  test("free plan visible", async ({ page }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const freePlan = pricingPage.getFreePlan()

    await expect(freePlan).toBeVisible()
  })

  test("pro plan visible", async ({ page }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const proPlan = pricingPage.getProPlan()

    await expect(proPlan).toBeVisible()
  })

  test.only("sign-up link navigates to kinde sign up", async ({ page }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const freeSignUpLink = pricingPage.getFreeSignUpLink()

    expect(freeSignUpLink).toBeVisible()

    await freeSignUpLink.click()

    expect(page).toHaveURL(regexKindeLogin)
  })
})
