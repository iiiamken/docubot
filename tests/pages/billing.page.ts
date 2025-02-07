import { Locator, Page } from "@playwright/test"

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
  //actions

  //methods
}
