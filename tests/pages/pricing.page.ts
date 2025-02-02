import { Page } from "@playwright/test"

export class Pricing {
  constructor(private page: Page) {}

  //locators
  private pricingTitle = this.page.locator("#pricing-title")
  private freePlan = this.page.locator("#Free-pricing-plan")
  private proPlan = this.page.locator("#Pro-pricing-plan")
  private pricingIntro = this.page.locator("#pricing-intro")
  private freeSignUpLink = this.page.locator("#free-sign-up-link")
  private upgradeLink = this.page.locator("#upgrade-link")

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

  getPricingIntro() {
    return this.pricingIntro
  }

  getFreeSignUpLink() {
    return this.freeSignUpLink
  }

  getUpgradeLink() {
    return this.upgradeLink
  }
  //actions
  async navigateToPricingPage() {
    await this.page.goto("https://dokubot.vercel.app/pricing/")
  }
}
