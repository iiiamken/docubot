import test, { expect } from "@playwright/test"

test.describe("api test cases for auth callback api endpoint", () => {
  test("valid user returns success", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/authCallback",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          id: process.env.USER_ID!,
          email: process.env.KINDE_USERNAME!,
          given_name: "test",
          family_name: "test",
          picture: "test",
        }),
      }
    )

    const data = await response.json()

    expect(data.result.data.success).toBe(true)
  })

  test("invalid user returns UNAUTHORIZED", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/authCallback",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          id: "",
          email: "",
          given_name: "",
          family_name: "",
          picture: "",
        }),
      }
    )

    const data = await response.json()

    expect(data.error.data.code).toBe("UNAUTHORIZED")
  })

  test("no user returns UNAUTHORIZED", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/authCallback",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({}),
      }
    )

    const data = await response.json()

    expect(data.error.data.code).toBe("UNAUTHORIZED")
  })

  test("user not registered does not create new user", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/authCallback",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          id: "test",
          email: "test",
          given_name: "test",
          family_name: "test",
          picture: "test",
        }),
      }
    )

    const data = await response.json()

    expect(data.error.data.code).toBe("UNAUTHORIZED")
  })
})
