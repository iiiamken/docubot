import test, { expect } from "@playwright/test"
import { Chat } from "../pages/chat.page"
import { LoginPage } from "../pages/loginPage.page"
import {
  chatPageUrl,
  kindePassword,
  kindeUsername,
} from "../test-data/test.data"

test.describe("test for chat page with test file item", () => {
  test("navigations to testfile works", async ({ page }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage()

    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)

    const testFile = chatPage.getTestFile()

    await testFile.click()

    await expect(page).toHaveURL(chatPageUrl)
  })

  test("pdf loader works", async ({ page }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage()

    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)

    const testFile = chatPage.getTestFile()
    await testFile.click()

    const pdfContent = chatPage.getPdfContent()

    await expect(pdfContent).toBeVisible()
  })
})
