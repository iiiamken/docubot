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
    const description = homePage.getDescription().innerText()

    expect(description).toBe(
      "Dokubot allows you to have conversations with any PDF document. Simply upload your file and start asking questions right away."
    )
  })
})
