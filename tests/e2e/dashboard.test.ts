import test from "@playwright/test"
import { Dashboard } from "../pages/dashboard.page"

test.describe("tests for dashboard page", () => {
  test("login to navigate to dashboard", async ({ page }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()
  })
})
