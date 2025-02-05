import { Page } from "@playwright/test"
import { chatPageUrl, fileItemId } from "../test-data/test.data"

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
  async navigateToChatPage() {
    await this.page.goto(chatPageUrl)
  }
}
