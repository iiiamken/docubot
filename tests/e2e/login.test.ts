import { expect, test } from "@playwright/test"
import { LoginPage } from "../pages/loginPage.page"

test("Login and save session state", async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.navigateToLoginPage()
  await loginPage.login(
    process.env.KINDE_USERNAME!,
    process.env.KINDE_PASSWORD!
  )

  // Validate that login was successful
  await expect(page.locator("#dashboard-title")).toBeVisible()
})
