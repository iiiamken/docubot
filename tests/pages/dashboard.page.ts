import { Page } from "@playwright/test"

export class Dashboard {
  constructor(private page: Page) {}

  //locators

  //getters

  //actions
  async navigateToDashboard() {
    await this.page.goto("https://dokubot.vercel.app/dashboard/")
  }
}
