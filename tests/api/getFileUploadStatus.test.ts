import test, { expect } from "@playwright/test"
import { fileId } from "../test-data/test.data"

test.describe("api test cases for getFileUploadStatus api endpoint", () => {
  test("get file upload status with valid file id returns the correct file", async ({
    request,
  }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFileUploadStatus",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          fileId: fileId,
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

    expect(data.result.data.status).toBe("SUCCESS")
  })

  test("get file upload status with invalid file id", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFileUploadStatus",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          fileId: "",
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

  test("get file upload status with invalid user", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFileUploadStatus",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          fileId: fileId,
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
