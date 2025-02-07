import { Locator, Page } from "@playwright/test"
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
  private testFile: Locator
  private subbedTestFile: Locator
  private pdfContent: Locator
  private pdfOptionsBar: Locator
  private nextPage: Locator
  private prevPage: Locator
  private inputPage: Locator
  private rotationButton: Locator
  private fullscreenModal: Locator
  private fullscreenButton: Locator
  private zoomButton: Locator
  private zoomOption200: Locator
  private tooManyPages: Locator
  private errorPlanInfo: Locator
  private errorBackButton: Locator
  private readyToChat: Locator
  private submitMessageButton: Locator
  private textInputField: Locator

  constructor(private page: Page) {
    //locators
    this.testFile = this.page.locator(fileItemId)
    this.subbedTestFile = this.page.locator(SubbedFileItemId)
    //chat section locators
    this.pdfContent = this.page.locator(".react-pdf__Page")
    this.pdfOptionsBar = this.page.locator("#pdf_options_bar")
    this.nextPage = this.page.locator("#next_page_button")
    this.prevPage = this.page.locator("#prev_page_button")
    this.inputPage = this.page.locator("#input_page")
    this.rotationButton = this.page.locator("#rotate_button")
    this.fullscreenModal = this.page.locator("#radix-\\:r2\\:")
    this.fullscreenButton = this.page.locator("#fullscreen_button")
    this.zoomButton = this.page.locator("#zoom_button")
    this.zoomOption200 = this.page.locator("#zoom_200")
    //message section locators

    this.tooManyPages = this.page.locator("#too_many_pages_error")
    this.errorPlanInfo = this.page.locator("#error_plan_info")
    this.errorBackButton = this.page.locator("#too_many_pages_back_button")
    this.readyToChat = this.page.locator("#all_set")
    this.submitMessageButton = this.page.locator("#submit_message_button")
    this.textInputField = this.page.locator("#text_input_field")
  }

  // //getters
  getTestFile() {
    return this.testFile
  }

  getPdfContent() {
    return this.pdfContent
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

  async getScaleFactor() {
    return await this.page
      .locator('.react-pdf__Page[data-page-number="1"]:not(.hidden)')
      .evaluate((el) =>
        getComputedStyle(el).getPropertyValue("--scale-factor").trim()
      )
  }

  async getRotationValue() {
    return await this.page
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
  async navigateToChatPage() {
    await this.page.goto(chatPageUrl)
    const loginPage = new LoginPage(this.page)
    await loginPage.login(kindeUsername, kindePassword)

    const testFile = this.getTestFile()
    await testFile.click()
  }

  async navigateToSubbedChatPage() {
    await this.page.goto(chatPageUrl)
    const loginPage = new LoginPage(this.page)
    await loginPage.login(subbedKindeUsername, subbedKindePassword)

    const subbedTestFile = this.getSubbedTestFile()
    await subbedTestFile.click()
  }
}
