import test, { expect } from "@playwright/test"
import { Home } from "../pages/home.page"
import { regexKindeLogin, regexKindeRegister } from "../test-data/test.data"

test.describe("Test homepage", () => {
  test("Go to homepage", async ({ page }) => {
    const homePage = new Home(page)
    await homePage.navigateToPage()
    const currentUrl = page.url()

    expect(currentUrl).toBe("https://dokubot.vercel.app/")
  })

  test("Description to be visible", async ({ page }) => {
    const homePage = new Home(page)
    await homePage.navigateToPage()
    const descriptionElement = homePage.getDescription()

    await expect(descriptionElement).toBeVisible()

    const descriptionText = await descriptionElement.textContent()

    expect(descriptionText).toBe(
      "Dokubot allows you to have conversations with any PDF document. Simply upload your file and start asking questions right away."
    )
  })

  test("dashboard preview image to be visible", async ({ page }) => {
    const homePage = new Home(page)
    await homePage.navigateToPage()

    const previewImage = homePage.getDashboardImage()

    await expect(previewImage).toBeVisible()
  })

  test("upload image to be visible", async ({ page }) => {
    const homePage = new Home(page)
    await homePage.navigateToPage()

    const uploadImage = homePage.getUploadImage()

    await expect(uploadImage).toBeVisible()
  })

  test("step1,2,3 components visible", async ({ page }) => {
    const homePage = new Home(page)
    await homePage.navigateToPage()

    const step1 = homePage.getStep1()

    await expect(step1).toBeVisible()

    const step2 = homePage.getStep1()

    await expect(step2).toBeVisible()

    const step3 = homePage.getStep1()

    await expect(step3).toBeVisible()
  })

  test("get started link navigate to kinde login", async ({ page }) => {
    const homePage = new Home(page)
    await homePage.navigateToPage()
    const context = page.context() // Get the current browser context

    const getStartedLink = homePage.getGetStartedLink()

    await expect(getStartedLink).toBeVisible()
    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Wait for the new tab
      await getStartedLink.click(), // Click that triggers the new tab
    ])

    await newPage.waitForLoadState() // Ensure the page is fully loaded
    await expect(newPage).toHaveURL(regexKindeLogin)
  })

  test("sign in button navigate to kinde login", async ({ page }) => {
    const homePage = new Home(page)
    await homePage.navigateToPage()

    const signIn = homePage.getSignIn()

    await expect(signIn).toBeVisible()

    await signIn.click()

    await expect(page).toHaveURL(regexKindeLogin)
  })

  test("get started navbar button navigate to kinde register page", async ({
    page,
  }) => {
    const homePage = new Home(page)
    await homePage.navigateToPage()

    const registerLink = homePage.getRegisterLink()

    await expect(registerLink).toBeVisible()

    await registerLink.click()

    await expect(page).toHaveURL(regexKindeRegister)
  })

  test("pricing button to navigate to pricing page", async ({ page }) => {
    const homePage = new Home(page)
    await homePage.navigateToPage()

    const pricingLink = homePage.getPricingLink()

    await expect(pricingLink).toBeVisible()

    await pricingLink.click()

    await expect(page).toHaveURL("https://dokubot.vercel.app/pricing/")
  })
})
