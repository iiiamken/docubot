import test from "@playwright/test"
import { Home } from "../pages/home.page"

test.describe("Test homepage", () => {
  test("Title should be visible on start", async ({ page }) => {
    const homePage = new Home(page)

    await homePage.navigateToPage()
  })
})
