import { Locator, Page } from "@playwright/test"

export class Home {
  link: Locator | undefined
  constructor(private page: Page) {}

  //locators
  private title = this.page.locator("#title")

  //actions
  async navigateToPage() {
    await this.page.goto("https://dokubot.vercel.app")
  }

  async clickLink() {
    await this.link?.click()
  }
}
