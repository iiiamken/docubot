import { Locator, Page } from "@playwright/test"
import { LoginPage } from "./loginPage.page"

export class Billing {
  private manageSubButton: Locator
  private currentPlanDetails: Locator
  private planDuration: Locator

  constructor(private page: Page) {
    //locators
    this.manageSubButton = this.page.locator("#manage_sub_button")
    this.currentPlanDetails = this.page.locator("#current_plan_description")
    this.planDuration = this.page.locator("#plan_duration")
  }

  //methods
  async isManageSubButtonVisible() {
    return await this.manageSubButton.isVisible()
  }

  async clickManageSubButton() {
    await this.manageSubButton.click()
    await this.page.waitForTimeout(3000)
  }
  async toHaveUrlStripeCheckout() {
    return this.page.url()
  }

  async isCurrentPlanDetailsVisible() {
    return await this.currentPlanDetails.isVisible()
  }

  async isPlanDurationVisible() {
    return await this.planDuration.isVisible()
  }

  async navigateToBillingPage() {
    await this.page.goto("https://dokubot.vercel.app/dashboard")
    const loginPage = new LoginPage(this.page)
    await loginPage.login(
      process.env.KINDE_USERNAME!,
      process.env.KINDE_PASSWORD!
    )
    await this.page.waitForTimeout(5000)

    await this.page.goto("https://dokubot.vercel.app/dashboard/billing")
    await this.page.waitForTimeout(3000)
  }
  async navigateToBillingPageSubbed() {
    await this.page.goto("https://dokubot.vercel.app/dashboard")
    const loginPage = new LoginPage(this.page)
    await loginPage.login(
      process.env.SUBBED_KINDE_USERNAME!,
      process.env.SUBBED_KINDE_PASSWORD!
    )
    await this.page.waitForTimeout(5000)

    await this.page.goto("https://dokubot.vercel.app/dashboard/billing")
    await this.page.waitForTimeout(3000)
  }
}
