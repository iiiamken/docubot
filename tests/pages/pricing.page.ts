import { Page } from "@playwright/test"

export class Pricing {
  constructor(private page: Page) {}

  //locators
  private pricingTitle = this.page.locator("#pricing-title")
  private freePlan = this.page.locator("#Free-pricing-plan")
  private proPlan = this.page.locator("#Pro-pricing-plan")
  private pricingIntro = this.page.locator("#pricing-intro")
  private freeSignUpLink = this.page.locator("#free-sign-up-link")
  private proSignUpLink = this.page.locator("#pro-sign-up-link")
  private freeUpgradeLink = this.page.locator("#free-upgrade-link")
  private freeMaxPages = this.page.locator("#free-max-pages")
  private proMaxPages = this.page.locator("#pro-max-pages")

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

  getProSignUpLink() {
    return this.proSignUpLink
  }

  getFreeUpgradeLink() {
    return this.freeUpgradeLink
  }

  getFreeMaxPages() {
    return this.freeMaxPages
  }

  getProMaxPages() {
    return this.proMaxPages
  }
  //actions
  async navigateToPricingPage() {
    await this.page.goto("https://dokubot.vercel.app/pricing/")
  }
}
