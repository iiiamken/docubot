import { Page } from "@playwright/test"
import {
  chatPageUrl,
  fileItemId,
  kindePassword,
  kindeUsername,
  SubbedFileItemId,
  subbedKindePassword,
  subbedKindeUsername,
} from "../test-data/test.data"
import { LoginPage } from "./loginPage.page"

export class Chat {
  constructor(private page: Page) {}

  //locators
  private testFile = this.page.locator(fileItemId)
  private subbedTestFile = this.page.locator(SubbedFileItemId)

  private pdfContent = this.page.locator(".react-pdf__Page")
  private pdfOptionsBar = this.page.locator("pdf_options_bar")
  private nextPage = this.page.locator("#next_page_button")
  private prevPage = this.page.locator("#prev_page_button")
  private inputPage = this.page.locator("#input_page")
  private rotationButton = this.page.locator("#rotate_button")
  private fullscreenModal = this.page.locator("#radix-\\:r2\\:")
  private fullscreenButton = this.page.locator("#fullscreen_button")
  private zoomButton = this.page.locator("#zoom_button")
  private zoomOption200 = this.page.locator("#zoom_200")

  private tooManyPages = this.page.locator("#too_many_pages_error")
  private errorPlanInfo = this.page.locator("#error_plan_info")
  private errorBackButton = this.page.locator("#too_many_pages_back_button")
  private readyToChat = this.page.locator("#all_set")
  private submitMessageButton = this.page.locator("#submit_message_button")
  private textInputField = this.page.locator("#text_input_field")

  //getters
  getTestFile() {
    return this.testFile
  }

  getPdfContent() {
    return this.pdfContent
  }

  getPdfPageNav() {
    return this.getPdfPageNav
  }

  getPdfOptionsBar() {
    return this.pdfOptionsBar
  }

  getPageNumber() {
    return this.page.getAttribute(".react-pdf__Page", "data-page-number")
  }

  getZoomButton() {
    return this.zoomButton
  }

  getZoomOption200() {
    return this.zoomOption200
  }
  getNextPageButton() {
    return this.nextPage
  }

  getPrevPageButton() {
    return this.prevPage
  }

  getInputPage() {
    return this.inputPage
  }

  getScaleFactor() {
    return this.page
      .locator('.react-pdf__Page[data-page-number="1"]:not(.hidden)')
      .evaluate((el) =>
        getComputedStyle(el).getPropertyValue("--scale-factor").trim()
      )
  }

  getRotationValue() {
    return this.page
      .locator(".react-pdf__Page__textContent")
      .getAttribute("data-main-rotation")
  }
  getRotateButton() {
    return this.rotationButton
  }

  getFullscreenModal() {
    return this.fullscreenModal
  }

  getFullscreenButton() {
    return this.fullscreenButton
  }

  //message getters

  getTooManyPages() {
    return this.tooManyPages
  }

  getErrorPlanInfo() {
    return this.errorPlanInfo
  }

  getErrorBackButton() {
    return this.errorBackButton
  }

  getSubbedTestFile() {
    return this.subbedTestFile
  }

  getReadyToChat() {
    return this.readyToChat
  }

  getSubmitMessageButton() {
    return this.submitMessageButton
  }

  getTextInputField() {
    return this.textInputField
  }
  //actions
  async navigateToChatPage(page: Page) {
    await this.page.goto(chatPageUrl)
    const loginPage = new LoginPage(page)
    await loginPage.login(kindeUsername, kindePassword)

    const testFile = this.getTestFile()
    await testFile.click()
  }

  async navigateToSubbedChatPage(page: Page) {
    await this.page.goto(chatPageUrl)
    const loginPage = new LoginPage(page)
    await loginPage.login(subbedKindeUsername, subbedKindePassword)

    const subbedTestFile = this.getSubbedTestFile()
    await subbedTestFile.click()
  }
}
