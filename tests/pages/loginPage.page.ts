import { Page } from "@playwright/test"
import { kindeLoginPage } from "../test-data/test.data"

export class LoginPage {
  constructor(private page: Page) {}
  //locators
  private usernameInput = this.page.locator(
    "#sign_up_sign_in_credentials_p_email"
  )
  private passwordInput = this.page.locator("#verify_password_p_password")
  private usernameSubmitButton = this.page.locator(
    ".kinde-button.kinde-button-variant-primary"
  )
  private passwordSubmitButton = this.page.locator(
    ".kinde-button.kinde-button-variant-primary"
  )

  //getters
  getUsernameInput() {
    return this.usernameInput
  }
  getPasswordInput() {
    return this.passwordInput
  }
  getUsernameSubmitBtn() {
    return this.usernameSubmitButton
  }
  getPasswordSubmitBtn() {
    return this.passwordSubmitButton
  }

  //actions
  async navigateToDashboard() {
    await this.page.goto(kindeLoginPage)
  }
}
