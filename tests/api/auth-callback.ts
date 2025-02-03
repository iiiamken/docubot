import test, { expect } from "@playwright/test"

test.describe("api test cases for auth callback api endpoint", () => {
  test.only("user not logged in returns UNAUTHORIZED", async ({ request }) => {
    const loginResponse = await request.post(
      "https://dokubot.vercel.app/dashboard/billing"
    )

    expect(loginResponse.status()).toBe(400)
  })
})
