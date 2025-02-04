import { Page } from "@playwright/test"
import { kindeLoginPage } from "../test-data/test.data"

export class LoginPage {
  constructor(private page: Page) {}
  //locators
  private usernameInput = "#sign_up_sign_in_credentials_p_email"

  private passwordInput = "#verify_password_p_password"
  private usernameSubmitButton = ".kinde-button.kinde-button-variant-primary"

  private passwordSubmitButton = ".kinde-button.kinde-button-variant-primary"

  //   private usernameInput = this.page.locator(
  //     "#sign_up_sign_in_credentials_p_email"
  //   )
  //   private passwordInput = this.page.locator("#verify_password_p_password")
  //   private usernameSubmitButton = this.page.locator(
  //     ".kinde-button.kinde-button-variant-primary"
  //   )
  //   private passwordSubmitButton = this.page.locator(
  //     ".kinde-button.kinde-button-variant-primary"
  //   )

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

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username)
    await this.page.click(this.usernameSubmitButton)
    await this.page.fill(this.passwordInput, password)
    await this.page.click(this.passwordSubmitButton)
  }

  async saveSessionState(): Promise<void> {
    await this.page.context().storageState({ path: "config/storageState.json" })
  }
}
