import { Locator, Page } from "@playwright/test"

export class Home {
  private description: Locator
  private previewImage: Locator
  private step1: Locator
  private step2: Locator
  private step3: Locator
  private getStartedLink: Locator
  private uploadImage: Locator
  private signIn: Locator
  private registerLink: Locator
  private pricingLink: Locator

  constructor(private page: Page) {
    //locators
    this.description = this.page.locator("#test-description")
    this.previewImage = this.page.locator("#dashboard-preview-image")
    this.uploadImage = this.page.locator("#file-upload-preview-image")
    this.step1 = this.page.locator("#step-1")
    this.step2 = this.page.locator("#step-2")
    this.step3 = this.page.locator("#step-3")
    this.getStartedLink = this.page.locator("#get-started-link")
    this.signIn = this.page.locator("#sign-in-link")
    this.registerLink = this.page.locator("#register-link")
    this.pricingLink = this.page.locator("#pricing-link")
  }

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

  getRegisterLink() {
    return this.registerLink
  }

  getPricingLink() {
    return this.pricingLink
  }
  //actions
  async navigateToPage() {
    await this.page.goto("https://dokubot.vercel.app/")
    await this.page.waitForTimeout(3000)
  }
}
