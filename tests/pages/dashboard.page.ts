import { Locator, Page } from "@playwright/test"
import { fileItemId } from "../test-data/test.data"
import { LoginPage } from "./loginPage.page"

export class Dashboard {
  private uploadButton: Locator
  private modal: Locator
  private fileItem: Locator
  private pdfField: Locator
  private testFileDeleteBtn: Locator

  constructor(private page: Page) {
    //locators
    this.uploadButton = this.page.locator("#upload_button")
    this.modal = this.page.locator("#radix-\\:R9fntb\\:")
    this.fileItem = this.page.locator(fileItemId)
    this.pdfField = this.page.locator("#pdf_field")
    this.testFileDeleteBtn = this.page.locator("#delete_test_file_upload\\.pdf")
  }

  //getters
  getUploadButton() {
    return this.uploadButton
  }

  getModal() {
    return this.modal
  }

  getFileItem() {
    return this.fileItem
  }

  getPdfField() {
    return this.pdfField
  }

  getTestFileDeleteBtn() {
    return this.testFileDeleteBtn
  }

  //actions
  async navigateToDashboard() {
    await this.page.goto("https://dokubot.vercel.app/dashboard/")
    const loginPage = new LoginPage(this.page)
    await loginPage.login(
      process.env.KINDE_USERNAME!,
      process.env.KINDE_PASSWORD!
    )
    await this.page.waitForTimeout(3000)
  }
}
