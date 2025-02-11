import test, { expect } from "@playwright/test"

test.describe("api test cases for getFileUploadStatus api endpoint", () => {
  test.only("get file upload status with valid fileKey returns the correct file", async ({
    request,
  }) => {
    const inputData = {
      fileId: "test",
      user: {
        id: "test",
        email: "test",
        given_name: "test",
        family_name: "test",
        picture: "test",
      },
    }
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getFileUploadStatus",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          inputData,
        }),
      }
    )

    const data = await response.json()

    expect(data).toBe("test")
  })
})
