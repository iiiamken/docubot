import test, { expect } from "@playwright/test"
import { Billing } from "../pages/billing.page"
import { regexStripeBilling, regexStripeCheckout } from "../test-data/test.data"

test.describe("test Billing page", () => {
  test("current plan details visible", async ({ page }) => {
    const billingPage = new Billing(page)
    await billingPage.navigateToBillingPage()

    const currentPlan = await billingPage.isCurrentPlanDetailsVisible()
    expect(currentPlan).toBeTruthy()
  })

  test("isPlanDurationVisible not visible with unsubbed/new user", async ({
    page,
  }) => {
    const billingPage = new Billing(page)
    await billingPage.navigateToBillingPage()

    const currentPlan = await billingPage.isPlanDurationVisible()
    expect(currentPlan).toBeFalsy()
  })

  test("isPlanDurationVisible visible with subbed user", async ({ page }) => {
    const billingPage = new Billing(page)
    await billingPage.navigateToBillingPageSubbed()

    const currentPlan = await billingPage.isPlanDurationVisible()
    expect(currentPlan).toBeTruthy()
  })

  test("isManageSubButtonVisible visible", async ({ page }) => {
    const billingPage = new Billing(page)
    await billingPage.navigateToBillingPage()

    const currentPlan = await billingPage.isManageSubButtonVisible()
    expect(currentPlan).toBeTruthy()
  })

  test("clickManageSubButton navigates to stripe checkout page with non subbed user", async ({
    page,
  }) => {
    const billingPage = new Billing(page)
    await billingPage.navigateToBillingPage()

    await billingPage.clickManageSubButton()

    await expect(page).toHaveURL(regexStripeCheckout)
  })

  test("clickManageSubButton navigates to stripe billing/manage page with subbed user", async ({
    page,
  }) => {
    const billingPage = new Billing(page)
    await billingPage.navigateToBillingPageSubbed()

    await billingPage.clickManageSubButton()

    await expect(page).toHaveURL(regexStripeBilling)
  })
})
