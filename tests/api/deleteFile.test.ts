import test, { expect } from "@playwright/test"
import {
  deleteFileId,
  fileId,
  kindeUsername,
  userId,
} from "../test-data/test.data"

test.describe("api test cases for deleteFile api endpoint", () => {
  test.skip("deletes file with valid user and fild id", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/deleteFile",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          fileId: deleteFileId,
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

    expect(data.result.data.id).toBe(deleteFileId)
  })

  test("input invalid user but valid file id", async ({ request }) => {
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/deleteFile",
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
