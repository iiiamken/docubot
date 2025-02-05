import test, { expect } from "@playwright/test"
import { Dashboard } from "../pages/dashboard.page"
import { LoginPage } from "../pages/loginPage.page"
import {
  fileItemId,
  kindePassword,
  kindeUsername,
} from "../test-data/test.data"

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

    await expect(modal).toBeVisible({ timeout: 5000 })
  })

  test("file visible and navigates to message page", async ({ page }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()

    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)

    const fileItem = dashboardPage.getFileItem()

    await fileItem.click()

    await expect(page).toHaveURL(
      `https://dokubot.vercel.app/dashboard/${fileItemId}`
    )
  })

  test("check if upload pdf navigates to new message page on success", async ({
    page,
  }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()

    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)

    const uploadButton = dashboardPage.getUploadButton()

    await expect(uploadButton).toBeVisible({ timeout: 3000 })

    uploadButton.click()

    await page.setInputFiles(
      "#dropzone-file",
      "tests/test-data/ISTQB_CTFL_Syllabus_v4.0.1.pdf"
    )
    await page.waitForTimeout(10000)
    const pdfField = dashboardPage.getPdfField()

    await expect(pdfField).toBeVisible()

    await dashboardPage.navigateToDashboard()

    const testFile = dashboardPage.getTestFile()
  })
})
