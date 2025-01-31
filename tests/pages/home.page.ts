import { Locator, Page } from "@playwright/test"

export class Home {
  link: Locator | undefined
  constructor(private page: Page) {}

  //locators
  private description = this.page.locator("#test-description")
  private previewImage = this.page.locator("#dashboard-preview-image")
  private uploadImage = this.page.locator("#file-upload-preview-image")

  //getter for the description
  getDescription() {
    return this.description
  }

  getDashboardImage() {
    return this.previewImage
  }

  getUploadImage() {
    return this.uploadImage
  }
  //actions
  async navigateToPage() {
    await this.page.goto("https://dokubot.vercel.app/")
  }

  async clickLink() {
    await this.link?.click()
  }
}
