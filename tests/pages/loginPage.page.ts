import { Page } from "@playwright/test"

export class LoginPage {
  private usernameInput: string
  private passwordInput: string
  private usernameSubmitButton: string
  private passwordSubmitButton: string

  constructor(private page: Page) {
    //selectors
    this.usernameInput = "#sign_up_sign_in_credentials_p_email"
    this.passwordInput = "#verify_password_p_password"
    this.usernameSubmitButton = ".kinde-button.kinde-button-variant-primary"
    this.passwordSubmitButton = ".kinde-button.kinde-button-variant-primary"
  }

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
