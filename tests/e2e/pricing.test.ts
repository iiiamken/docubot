import test, { expect } from "@playwright/test"
import { Pricing } from "../pages/pricing.page"
import { regexKindeLogin } from "../test-data/test.data"
import exp from "constants"

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

  test("free max pages and pro max pages to be correctly rendered", async ({
    page,
  }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const freeMaxPages = pricingPage.getFreeMaxPages()

    await expect(freeMaxPages).toBeVisible()

    const freeMaxPagesText = freeMaxPages.textContent()

    expect(freeMaxPagesText).toBe("10 pages per PDF")

    const proMaxPages = pricingPage.getProMaxPages()

    await expect(proMaxPages).toBeVisible()

    const proMaxPagesText = proMaxPages.textContent()

    expect(proMaxPagesText).toBe("120 pages per PDF")
  })

  test("free sign-up link navigates to kinde sign up", async ({ page }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const freeSignUpLink = pricingPage.getFreeSignUpLink()

    await expect(freeSignUpLink).toBeVisible()

    await freeSignUpLink.click()

    await expect(page).toHaveURL(regexKindeLogin)
  })

  test("pro sign up link navigatest to kinde sign up", async ({ page }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const proSignUpLink = pricingPage.getProSignUpLink()

    await expect(proSignUpLink).toBeVisible()

    await proSignUpLink.click()

    await expect(page).toHaveURL(regexKindeLogin)
  })

  test("navbar to be visible on pricing page", async ({ page }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const navbar = pricingPage.getNavbar()

    await expect(navbar).toBeVisible()
  })
})
