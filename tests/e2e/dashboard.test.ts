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
    await page.waitForTimeout(3000)

    await uploadButton.click()
    const modal = dashboardPage.getModal()

    await expect(modal).toBeVisible()
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

  test("testing if upload test file and delete test file works", async ({
    page,
  }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()

    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)

    const uploadButton = dashboardPage.getUploadButton()

    await expect(uploadButton).toBeVisible()
    await page.waitForTimeout(3000)

    await uploadButton.click()

    await page.setInputFiles("#dropzone-file", "tests/test-data/test_file.pdf")
    await page.waitForTimeout(10000)
    const pdfField = dashboardPage.getPdfField()

    await expect(pdfField).toBeVisible()

    await dashboardPage.navigateToDashboard()

    const testFileDeleteBtn = dashboardPage.getTestFileDeleteBtn()

    console.log(testFileDeleteBtn)

    await expect(testFileDeleteBtn).toBeVisible()

    await testFileDeleteBtn.click()

    await expect(testFileDeleteBtn).toBeHidden()
  })
})
