import test, { expect } from "@playwright/test"
import { getToken } from "../../utils/getToken"

test.describe("api test cases for auth callback api endpoint", () => {
  test("user not logged in returns UNAUTHORIZED", async ({ request }) => {
    const token = await getToken()
    console.log(token)
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/authCallback",
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          id: "test2",
          email: "test2",
          given_name: "test",
          family_name: "test",
          picture: "test",
        }),
      }
    )

    const data = await response.json()

    console.log(
      "datadatadatadatadatadatadata",
      data as { data: { success: boolean } }
    )

    expect(data.result.data.success).toBe(true)
  })
})
