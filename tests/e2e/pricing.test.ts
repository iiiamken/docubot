import test, { expect } from "@playwright/test"
import { Pricing } from "../pages/pricing.page"
import { regexKindeLogin, regexKindeRegister } from "../test-data/test.data"

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

  test.only("free max pages and pro max pages to be correctly rendered", async ({
    page,
  }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const freeMaxPages = pricingPage.getFreeMaxPages()

    await expect(freeMaxPages).toBeVisible()

    const freeMaxPagesText = freeMaxPages.innerText()

    expect(freeMaxPagesText).toBe("10 pages per PDF")

    const proMaxPages = pricingPage.getProMaxPages()

    await expect(proMaxPages).toBeVisible()

    const proMaxPagesText = proMaxPages.innerText()

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

  test("sign in button navigate to kinde login", async ({ page }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const signIn = pricingPage.getSignIn()

    await expect(signIn).toBeVisible()

    await signIn.click()

    await expect(page).toHaveURL(regexKindeLogin)
  })

  test("get started navbar button navigate to kinde register page", async ({
    page,
  }) => {
    const pricingPage = new Pricing(page)
    await pricingPage.navigateToPricingPage()

    const registerLink = pricingPage.getRegisterLink()

    await expect(registerLink).toBeVisible()

    await registerLink.click()

    await expect(page).toHaveURL(regexKindeRegister)
  })
})
