import { Page } from "@playwright/test"
import {
  fileItemId,
  kindePassword,
  kindeUsername,
} from "../test-data/test.data"
import { LoginPage } from "./loginPage.page"

export class Dashboard {
  constructor(private page: Page) {}

  //locators
  private uploadButton = this.page.locator("#upload_button")
  private modal = this.page.locator("#radix-\\:R9fntb\\:")
  private redirectingLoader = this.page.locator("#redirecting_loader")
  private fileItem = this.page.locator(fileItemId)
  private pdfField = this.page.locator("#pdf_field")
  private testFileDeleteBtn = this.page.locator("#delete_test_file\\.pdf")

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

  getTestFileDeleteBtn() {
    return this.testFileDeleteBtn
  }

  //actions
  async navigateToDashboard(page: Page) {
    await this.page.goto("https://dokubot.vercel.app/dashboard/")
    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)
  }
}
