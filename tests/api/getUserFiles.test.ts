import test, { expect } from "@playwright/test"
import { kindeUsername, userId } from "../test-data/test.data"

test.describe("api test cases for getUserFiles api endpoint", () => {
  test("get files with valid userId returns users files", async ({
    request,
  }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getUserFiles",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          id: userId,
          email: kindeUsername,
          given_name: "test",
          family_name: "test",
          picture: "test",
        }),
      }
    )

    const data = await response.json()

    expect(data.result.data[0].userId).toBe(userId)
  })

  test("get files with invalid userId returns UNAUTHORIZED", async ({
    request,
  }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getUserFiles",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          id: "testing",
          email: "testing",
          given_name: "test",
          family_name: "test",
          picture: "test",
        }),
      }
    )

    const data = await response.json()

    expect(data.error.data.code).toBe("UNAUTHORIZED")
  })
  test("get files with empty fields returns UNAUTHORIZED", async ({
    request,
  }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getUserFiles",
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

    console.log(data)
    expect(data.error.data.code).toBe("UNAUTHORIZED")
  })

  test("get files with no user returns UNAUTHORIZED", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getUserFiles",
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
})
