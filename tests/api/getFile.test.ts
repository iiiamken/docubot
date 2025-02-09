import test, { expect } from "@playwright/test"
import { getToken } from "../../utils/getToken"

test.describe("api test cases for getfile api endpoint", () => {
  test.only("GETFILE user not logged in returns UNAUTHORIZED", async ({
    request,
  }) => {
    const token = await getToken()
    console.log(token)
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/deleteFile"
    )

    const data = await response.json()

    console.log("datadatadatadatadatadatadata", data)
    console.log(
      "data.error.data.codedata.error.data.codedata.error.data.codedata.error.data.codedata.error.data.code",
      data.error.data.code
    )
    expect(data.error.data.code).toBe("UNSUPPORTED_MEDIA_TYPE")
  })
})
