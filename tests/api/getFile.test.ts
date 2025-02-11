import test, { expect } from "@playwright/test"
import { fileKey, kindeUsername, userId } from "../test-data/test.data"

test.describe("api test cases for getfile api endpoint", () => {
  test("get file with valid fileKey returns the correct file", async ({
    request,
  }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          key: fileKey,
          user: {
            id: userId,
            email: kindeUsername,
            given_name: "test",
            family_name: "test",
            picture: "test",
          },
        }),
      }
    )

    const data = await response.json()

    expect(data.result.data.key).toBe(fileKey)
  })

  test("get file with no fileKey", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          key: "",
          user: {
            id: userId,
            email: kindeUsername,
            given_name: "test",
            family_name: "test",
            picture: "test",
          },
        }),
      }
    )

    const data = await response.json()

    expect(data.error.data.code).toBe("UNAUTHORIZED")
  })

  test("get file with invalid fileKey", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          key: "test",
          user: {
            id: userId,
            email: kindeUsername,
            given_name: "test",
            family_name: "test",
            picture: "test",
          },
        }),
      }
    )

    const data = await response.json()

    expect(data.error.data.code).toBe("NOT_FOUND")
  })

  test("get file with invalid user id", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          key: "",
          user: {
            id: "test",
            email: "test",
            given_name: "test",
            family_name: "test",
            picture: "test",
          },
        }),
      }
    )

    const data = await response.json()

    expect(data.error.data.code).toBe("UNAUTHORIZED")
  })

  test("get file with invalid user id with fileKey", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          key: fileKey,
          user: {
            id: "test",
            email: "test",
            given_name: "test",
            family_name: "test",
            picture: "test",
          },
        }),
      }
    )

    const data = await response.json()

    expect(data.error.data.code).toBe("UNAUTHORIZED")
  })
})
