import test, { expect } from "@playwright/test"
import { Chat } from "../pages/chat.page"
import { chatPageUrl } from "../test-data/test.data"
import { time } from "console"

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

  test("pdf options bar visible", async ({ page }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)

    const pdfOptionsBar = chatPage.getPdfOptionsBar()
    await expect(pdfOptionsBar).toBeVisible()
  })

  // test.describe.only("pdf options page navigation works", () => {})

  // test("pdf options zoom changes scale factor", async ({ page }) => {})
  // test("pdf options rotate button rotates page", async ({ page }) => {})
  // test("pdf options fullscreen feature opens modal", async ({ page }) => {})
})
test("selecting a page works", async ({ page }) => {
  const chatPage = new Chat(page)
  await chatPage.navigateToChatPage(page)
  await page.waitForTimeout(5000)

  await page.fill("#input_page", "5")
  await page.press("#input_page", "Enter")
  await page.waitForTimeout(3000)

  const pageNumber = await chatPage.getPageNumber()

  expect(pageNumber).toBe("5")
})

test.only("prev button works", async ({ page }) => {
  const chatPage = new Chat(page)
  await chatPage.navigateToChatPage(page)
  await page.waitForTimeout(5000)

  const prevPageBtn = chatPage.getPrevPageButton()

  await prevPageBtn.click()
  await page.waitForTimeout(3000)

  const pageNumber = await chatPage.getPageNumber()

  expect(pageNumber).toBe("1")
})

test("next button works", async ({ page }) => {
  const chatPage = new Chat(page)
  await chatPage.navigateToChatPage(page)
  await page.waitForTimeout(5000)

  const nextPageBtn = chatPage.getNextPageButton()

  await nextPageBtn.click()

  await page.waitForTimeout(3000)
  const pageNumber = await chatPage.getPageNumber()

  expect(pageNumber).toBe("2")
})
