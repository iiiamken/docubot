import { Page } from "@playwright/test"

export class Pricing {
  constructor(private page: Page) {}

  //locators
  private pricingTitle = this.page.locator("#pricing-title")
  private freePlan = this.page.locator("#Free-pricing-plan")
  private proPlan = this.page.locator("#Pro-pricing-plan")

  //getters
  getPricingTitle() {
    return this.pricingTitle
  }

  getFreePlan() {
    return this.freePlan
  }

  getProPlan() {
    return this.proPlan
  }

  //actions
  async navigateToPricingPage() {
    await this.page.goto("https://dokubot.vercel.app/pricing/")
  }
}
