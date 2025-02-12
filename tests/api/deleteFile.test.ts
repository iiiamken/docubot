import test, { expect } from "@playwright/test"

test.describe("api test cases for deleteFile api endpoint", () => {
  test.skip("deletes file with valid user and fild id", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/deleteFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          fileId: process.env.DELETE_FILE_ID!,
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

    expect(data.result.data.id).toBe(process.env.DELETE_FILE_ID)
  })

  test("input invalid user but valid file id", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/deleteFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          fileId: process.env.FILE_ID!,
          user: {
            id: "",
            email: "",
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

  test("input invalid user and invalid file id", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/deleteFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          fileId: "",
          user: {
            id: "",
            email: "",
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
