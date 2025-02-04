import { expect, test } from "@playwright/test"
import { LoginPage } from "../pages/loginPage.page"
import { kindePassword, kindeUsername } from "../test-data/test.data"

test("Login and save session state", async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.navigateToLoginPage()
  await loginPage.login(kindeUsername, kindePassword)

  // Save session state
  await loginPage.saveSessionState()

  // Validate that login was successful
  await expect(page.locator("#dashboard-title")).toBeVisible()
})
