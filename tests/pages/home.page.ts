import { Locator, Page } from "@playwright/test"

export class Home {
  link: Locator | undefined
  constructor(private page: Page) {}

  //locators
  private description = this.page.locator("#test-description")
  private previewImage = this.page.locator("#dashboard-preview-image")
  private uploadImage = this.page.locator("#file-upload-preview-image")
  private step1 = this.page.locator("#step-1")
  private step2 = this.page.locator("#step-2")
  private step3 = this.page.locator("#step-3")
  private getStartedLink = this.page.locator("#get-started-link")
  private signIn = this.page.locator("#sign-in-link")

  //getters
  getDescription() {
    return this.description
  }

  getDashboardImage() {
    return this.previewImage
  }

  getUploadImage() {
    return this.uploadImage
  }

  getStep1() {
    return this.step1
  }
  getStep2() {
    return this.step2
  }
  getStep3() {
    return this.step3
  }

  getGetStartedLink() {
    return this.getStartedLink
  }

  getSignIn() {
    return this.signIn
  }
  //actions
  async navigateToPage() {
    await this.page.goto("https://dokubot.vercel.app/")
  }

  async clickLink() {
    await this.link?.click()
  }
}
