import test, { expect } from "@playwright/test"
import { Dashboard } from "../pages/dashboard.page"

test.describe("tests for dashboard page", () => {
  test("login to navigate to dashboard, expect title to be visible", async ({
    page,
  }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()

    await expect(page.locator("#dashboard-title")).toBeVisible()
  })

  test("check if upload button is opens modal", async ({ page }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()

    const uploadButton = dashboardPage.getUploadButton()

    await expect(uploadButton).toBeVisible()
    await page.waitForTimeout(3000)

    await uploadButton.click()
    const modal = dashboardPage.getModal()

    await expect(modal).toBeVisible()
  })

  test("test file visible on login and navigates to message page on click", async ({
    page,
  }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()

    const fileItem = dashboardPage.getFileItem()

    await fileItem.click()

    await expect(page).toHaveURL(
      "https://dokubot.vercel.app/dashboard/cm6se7ovk0003la03gf36jd92"
    )
  })

  test("testing if upload new test file and delete test file works", async ({
    page,
  }) => {
    const dashboardPage = new Dashboard(page)
    await dashboardPage.navigateToDashboard()

    const uploadButton = dashboardPage.getUploadButton()

    await expect(uploadButton).toBeVisible()
    await page.waitForTimeout(3000)

    await uploadButton.click()

    await page.setInputFiles("#dropzone-file", "tests/test-data/test_file.pdf")
    await page.waitForTimeout(10000)
    const pdfField = dashboardPage.getPdfField()

    await expect(pdfField).toBeVisible()

    await page.goto("https://dokubot.vercel.app/dashboard/")

    const testFileDeleteBtn = dashboardPage.getTestFileDeleteBtn()

    await expect(testFileDeleteBtn).toBeVisible()

    await testFileDeleteBtn.click()

    await expect(testFileDeleteBtn).toBeHidden()
  })
})
