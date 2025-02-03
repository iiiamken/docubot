import test, { expect } from "@playwright/test"

test.describe("api test cases for auth callback api endpoint", () => {
  test.only("user not logged in returns UNAUTHORIZED", async ({ request }) => {
    const response = await request.get(
      "https://dokubot.vercel.app/api/trpc/authCallback"
    )

    // Ensure the request returns an UNAUTHORIZED error

    // Parse response JSON
    const data = await response.json()
    // Verify error code is "UNAUTHORIZED"
    expect(data.error.data.code).toBe("UNAUTHORIZED")
  })

  test("returns success code when user is logged in", async ({ page }) => {})
})
