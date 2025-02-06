import test, { expect } from "@playwright/test"
import { Chat } from "../pages/chat.page"
import { chatPageUrl } from "../test-data/test.data"

test.describe("tests for chat page with test file item", () => {
  test("navigations to testfile works", async ({ page }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)

    await expect(page).toHaveURL(chatPageUrl)
  })

  test("pdf loader renders file", async ({ page }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)

    const pdfContent = chatPage.getPdfContent()

    await expect(pdfContent).toBeVisible()
  })

  test("pdf options bar visible", async ({ page }) => {})
  test("pdf options page navigation works", async ({ page }) => {})
  test("pdf options zoom works", async ({ page }) => {})
  test("pdf options rotate page feature  works", async ({ page }) => {})
  test("pdf options fullscreen feature opens modal", async ({ page }) => {})
})
