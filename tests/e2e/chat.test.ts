import test, { expect } from "@playwright/test"
import { Chat } from "../pages/chat.page"
import { chatPageUrl } from "../test-data/test.data"

test.describe("tests for chat page pdf section", () => {
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

  test("pdf options page navigation works", async ({ page }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)
    await page.waitForTimeout(5000)
    //1. next page
    const nextPageBtn = chatPage.getNextPageButton()
    let pageNumber = await chatPage.getPageNumber()

    expect(pageNumber).toBe("1")

    await nextPageBtn.click()

    await page.waitForTimeout(3000)

    pageNumber = await chatPage.getPageNumber()

    expect(pageNumber).toBe("2")

    //2. prev page

    const prevPageBtn = chatPage.getPrevPageButton()

    await prevPageBtn.click()
    await page.waitForTimeout(3000)

    pageNumber = await chatPage.getPageNumber()

    expect(pageNumber).toBe("1")

    //3. navigate to page

    await page.fill("#input_page", "5")
    await page.press("#input_page", "Enter")
    await page.waitForTimeout(3000)

    pageNumber = await chatPage.getPageNumber()

    expect(pageNumber).toBe("5")
  })
  test("pdf options zoom changes scale factor", async ({ page }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)
    await page.waitForTimeout(5000)

    const zoomButton = chatPage.getZoomButton()
    await zoomButton.click()

    const zoomOption200 = chatPage.getZoomOption200()
    await zoomOption200.click()
    await page.waitForTimeout(3000)

    const scale = await chatPage.getScaleFactor()
    expect(scale).toMatch(/^2\./)
  })
  test("pdf options rotate button rotates page", async ({ page }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)
    await page.waitForTimeout(5000)

    let rotationValue = await chatPage.getRotationValue()
    expect(rotationValue).toBe("0")

    const rotateButton = chatPage.getRotateButton()
    await rotateButton.click()

    rotationValue = await chatPage.getRotationValue()

    await page.waitForTimeout(3000)

    expect(rotationValue).toBe("90")
  })
  test("pdf options fullscreen feature opens modal", async ({ page }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)
    await page.waitForTimeout(5000)

    const fullscreenButton = chatPage.getFullscreenButton()
    await fullscreenButton.click()
    await page.waitForTimeout(3000)

    const fullscreenModal = chatPage.getFullscreenModal()

    await expect(fullscreenModal).toBeVisible()
  })
})

test.describe("tests for chat message section", () => {
  test("too many pages error to be visible when user not subbed", async ({
    page,
  }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)
    await page.waitForTimeout(5000)

    const tooManyPages = chatPage.getTooManyPages()

    expect(tooManyPages).toBeVisible()
  })

  test("error plan info to render max pages for free user", async ({
    page,
  }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)
    await page.waitForTimeout(5000)

    const errorInfoText = await chatPage.getErrorPlanInfo().textContent()

    expect(errorInfoText).toBe(
      "Your Free plan supports up to 10 pages per PDF."
    )
  })

  test("too many pages back button navigates to dashboard", async ({
    page,
  }) => {
    const chatPage = new Chat(page)
    await chatPage.navigateToChatPage(page)
    await page.waitForTimeout(5000)

    const errorBackButton = chatPage.getErrorBackButton()

    await errorBackButton.click()

    await expect(page).toHaveURL("https://dokubot.vercel.app/dashboard")
  })
})
