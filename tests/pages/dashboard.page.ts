import { Page } from "@playwright/test"

export class Dashboard {
  constructor(private page: Page) {}

  //locators
  private uploadButton = this.page.locator("#upload_button")
  private modal = this.page.locator("#radix-\\:R9fntb\\:")
  private redirectingLoader = this.page.locator("#redirecting_loader")

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

  //actions
  async navigateToDashboard() {
    await this.page.goto("https://dokubot.vercel.app/dashboard/")
  }
}
