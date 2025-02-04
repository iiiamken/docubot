import test, { expect } from "@playwright/test"
import { Dashboard } from "../pages/dashboard.page"
import { LoginPage } from "../pages/loginPage.page"
import { kindePassword, kindeUsername } from "../test-data/test.data"

test.describe("tests for dashboard page", () => {
  test("login to navigate to dashboard, expect title to be visible", async ({
    page,
  }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()

    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)

    await expect(page.locator("#dashboard-title")).toBeVisible()
  })
})
