import { Locator, Page } from "@playwright/test"

export class Pricing {
  private pricingTitle: Locator
  private freePlan: Locator
  private proPlan: Locator
  private pricingIntro: Locator
  private freeSignUpLink: Locator
  private proSignUpLink: Locator
  private freeUpgradeLink: Locator
  private freeMaxPages: Locator
  private proMaxPages: Locator
  private navbar: Locator
  private signIn: Locator
  private registerLink: Locator

  constructor(private page: Page) {
    //locators
    this.pricingTitle = this.page.locator("#pricing-title")
    this.freePlan = this.page.locator("#Free-pricing-plan")
    this.proPlan = this.page.locator("#Pro-pricing-plan")
    this.pricingIntro = this.page.locator("#pricing-intro")
    this.freeSignUpLink = this.page.locator("#free-sign-up-link")
    this.proSignUpLink = this.page.locator("#pro-sign-up-link")
    this.freeUpgradeLink = this.page.locator("#free-upgrade-link")
    this.freeMaxPages = this.page.locator('[id="10 pages per PDF"]')
    this.proMaxPages = this.page.locator('[id="120 pages per PDF"]')
    this.navbar = this.page.locator("#navbar")
    this.signIn = this.page.locator("#sign-in-link")
    this.registerLink = this.page.locator("#register-link")
  }

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

  getNavbar() {
    return this.navbar
  }

  getSignIn() {
    return this.signIn
  }

  getRegisterLink() {
    return this.registerLink
  }
  //actions
  async navigateToPricingPage() {
    await this.page.goto("https://dokubot.vercel.app/pricing/")
    await this.page.waitForTimeout(3000)
  }
}
