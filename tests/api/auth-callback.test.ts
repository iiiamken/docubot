import test, { expect } from "@playwright/test"

test.describe("api test cases for auth callback api endpoint", () => {
  test.only("user not logged in returns UNAUTHORIZED", async ({ request }) => {
    const response = await request.get(
      "https://dokubot.vercel.app/api/trpc/authCallback"
    )

    // Ensure the request returns an UNAUTHORIZED error

    // Parse response JSON
    const responseData = await response.json()
    console.log(responseData)
    // Verify error code is "UNAUTHORIZED"
    expect(responseData.error.code).toBe("UNAUTHORIZED")
  })
})
