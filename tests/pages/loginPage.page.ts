import { Page } from "@playwright/test"

export class LoginPage {
  constructor(private page: Page) {}
  //selectors
  private usernameInput = "#sign_up_sign_in_credentials_p_email"
  private passwordInput = "#verify_password_p_password"
  private usernameSubmitButton = ".kinde-button.kinde-button-variant-primary"
  private passwordSubmitButton = ".kinde-button.kinde-button-variant-primary"

  //actions
  async navigateToLoginPage() {
    await this.page.goto("https://dokubot.vercel.app/dashboard/")
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username)
    await this.page.click(this.usernameSubmitButton)
    await this.page.fill(this.passwordInput, password)
    await this.page.click(this.passwordSubmitButton)
  }
}
