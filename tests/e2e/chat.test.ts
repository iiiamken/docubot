import test, { expect } from "@playwright/test"
import { Chat } from "../pages/chat.page"
import { chatPageUrl } from "../test-data/test.data"

test.describe("tests for chat page with test file item", () => {
  test("navigations to testfile works", async ({ page }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)

    await expect(page).toHaveURL(chatPageUrl)
  })

  test.only("pdf loader renders file", async ({ page }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)

    const pdfContent = chatPage.getPdfContent()

    await expect(pdfContent).toBeVisible()
  })

  test("pdf options bar visible and functions work", async ({ page }) => {})
})
