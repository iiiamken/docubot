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
  private pdfPageNav = this.page.locator("pdf_page_nav")
  private pdfOptionsBar = this.page.locator("pdf_options_bar")

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

  //actions
  async navigateToChatPage(page: Page) {
    await this.page.goto(chatPageUrl)
    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)

    const testFile = this.getTestFile()
    await testFile.click()
  }
}
