import { Page } from "@playwright/test"

export class Pricing {
  constructor(private page: Page) {}

  //locators
  private pricingTitle = this.page.locator("#pricing-title")

  //getters
  getPricingTitle() {
    return this.pricingTitle
  }

  //actions
  async navigateToPricingPage() {
    await this.page.goto("https://dokubot.vercel.app/pricing/")
  }
}
