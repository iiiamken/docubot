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

  test("check if upload button is opens modal", async ({ page }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()

    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)

    const uploadButton = dashboardPage.getUploadButton()

    await expect(uploadButton).toBeVisible()

    await uploadButton.click()

    const modal = dashboardPage.getModal()

    await expect(modal).toBeVisible()

    // await page.setInputFiles(
    //   'input[type="file"]',
    //   "tests/test-data/ISTQB_CTFL_Syllabus_v4.0.1.pdf"
    // )

    // const redirectingLoader = dashboardPage.getRedirectingLoader()

    // await expect(redirectingLoader).toBeVisible()
  })

  test.only("file visible and navigates to message page", async ({ page }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()

    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)

    const fileItem = dashboardPage.getFileItem()

    await fileItem.click()

    await expect(page).toHaveURL(
      `https://dokubot.vercel.app/dashboard/${fileItem}`
    )
  })
})
