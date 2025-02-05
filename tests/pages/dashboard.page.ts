import { Page } from "@playwright/test"

export class Dashboard {
  constructor(private page: Page) {}

  //locators
  private uploadButton = this.page.locator("#upload_button")
  private modal = this.page.locator("#radix-\\:R9fntb\\:")
  private redirectingLoader = this.page.locator("#redirecting_loader")
  private fileItem = this.page.locator("#cm6fnr1lx0001jq03fz2oe6ef")
  private pdfField = this.page.locator("#pdf_field")
  private testFile = this.page.locator("test_file_delete")

  //getters
  getUploadButton() {
    return this.uploadButton
  }

  getModal() {
    return this.modal
  }

  getRedirectingLoader() {
    return this.redirectingLoader
  }

  getFileItem() {
    return this.fileItem
  }

  getPdfField() {
    return this.pdfField
  }

  getTestFile() {
    return this.testFile
  }
  //actions
  async navigateToDashboard() {
    await this.page.goto("https://dokubot.vercel.app/dashboard/")
  }
}
