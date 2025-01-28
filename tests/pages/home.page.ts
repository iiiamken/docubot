import { Locator, Page } from "@playwright/test"

export class Home {
  link: Locator | undefined
  constructor(private page: Page) {}

  //locators
  private description = this.page.locator("#test-description")

  //getter for the description
  getDescription() {
    return this.description
  }

  //actions
  async navigateToPage() {
    await this.page.goto("https://dokubot.vercel.app/")
  }

  async clickLink() {
    await this.link?.click()
  }
}
