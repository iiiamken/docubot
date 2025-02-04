import { test, expect, chromium } from "@playwright/test"
import { LoginPage } from "../pages/loginPage.page"

test("Login and save session state", async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.navigateToLoginPage()
  await loginPage.login("your-username", "your-password")

  // Save session state
  await loginPage.saveSessionState()

  // Validate that login was successful
  await expect(page.locator("#logged-in-element")).toBeVisible()
})
