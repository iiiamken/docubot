import { Page } from "@playwright/test"
import { chatPageUrl } from "../test-data/test.data"

export class Chat {
  constructor(private page: Page) {}

  //actions
  async navigateToChatPage() {
    await this.page.goto(chatPageUrl)
  }
}
