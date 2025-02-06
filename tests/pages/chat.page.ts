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
  testFile = this.page.locator(fileItemId)
  pdfContent = this.page.locator(".react-pdf__Page")

  //getters
  getTestFile() {
    return this.testFile
  }

  getPdfContent() {
    return this.pdfContent
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
