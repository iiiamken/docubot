import test, { expect } from "@playwright/test"

test.describe("api test cases for getfile api endpoint", () => {
  test("get file with valid FILE_KEY returns the correct file", async ({
    request,
  }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          key: process.env.FILE_KEY!,
          user: {
            id: process.env.USER_ID!,
            email: process.env.KINDE_USERNAME!,
            given_name: "test",
            family_name: "test",
            picture: "test",
          },
        }),
      }
    )

    const data = await response.json()

    expect(data.result.data.key).toBe(process.env.FILE_KEY!)
  })

  test("get file with FILE_KEY,", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          key: "",
          user: {
            id: process.env.USER_ID!,
            email: process.env.KINDE_USERNAME!,
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

  test("get file with invald FILE_KEY", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          key: "test",
          user: {
            id: process.env.USER_ID!,
            email: process.env.KINDE_USERNAME!,
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

  test("get file with invalid user id with valid FILE_KEY,", async ({
    request,
  }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          key: process.env.FILE_KEY!,
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
