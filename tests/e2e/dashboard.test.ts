import test, { expect } from "@playwright/test"
import { Dashboard } from "../pages/dashboard.page"

test.describe("tests for dashboard page", () => {
  test.use({ storageState: "config/storageState.json" })
  test.only("login to navigate to dashboard", async ({ page }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()

    await expect(page.locator("#dashboard-title")).toBeVisible()
  })
})
