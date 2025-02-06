import { Page } from "@playwright/test"
import {
  chatPageUrl,
  fileItemId,
  kindePassword,
  kindeUsername,
} from "../test-data/test.data"
import { LoginPage } from "./loginPage.page"

export class Chat {
  constructor(private page: Page) {}

  //locators
  private testFile = this.page.locator(fileItemId)
  private pdfContent = this.page.locator(".react-pdf__Page")
  private pdfOptionsBar = this.page.locator("pdf_options_bar")
  private rotation = this.page
    .locator(".react-pdf__Page__textContent")
    .getAttribute("data-main-rotation")
  private pageNumber = this.page
    .locator(".react-pdf__Page")
    .getAttribute("data-page-number")
  private scaleFactor = this.page
    .locator(".react-pdf__Page")
    .evaluate((el) =>
      getComputedStyle(el).getPropertyValue("--scale-factor").trim()
    )
  private fullscreenModal = this.page.locator("#radix-:r2:")
  //getters
  getTestFile() {
    return this.testFile
  }

  getPdfContent() {
    return this.pdfContent
  }

  getPdfPageNav() {
    return this.getPdfPageNav
  }

  getPdfOptionsBar() {
    return this.pdfOptionsBar
  }

  getRotation() {
    return this.rotation
  }

  getPageNumber() {
    return this.pageNumber
  }

  getScaleFactor() {
    return this.scaleFactor
  }

  getFullscreenModal() {
    return this.fullscreenModal
  }

  //actions
  async navigateToChatPage(page: Page) {
    await this.page.goto(chatPageUrl)
    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)

    const testFile = this.getTestFile()
    await testFile.click()
  }
}
