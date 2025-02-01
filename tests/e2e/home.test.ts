import test, { expect } from "@playwright/test"
import { Home } from "../pages/home.page"

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
})
