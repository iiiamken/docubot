import test, { expect } from "@playwright/test"
import { getToken } from "../../utils/getToken"

test.describe("api test cases for getfile api endpoint", () => {
  test.only("GETFILE user not logged in returns UNAUTHORIZED", async ({
    request,
  }) => {
    const token = await getToken()
    console.log(token.access_token)
    const response = await request.post(
      "https://dokubot.vercel.app/api/trpc/getUserFiles",
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          id: "kp_e9ad9300d8cd45569c2de21a934e91ab",
          email: "d_kenii@hotmail.com",
          given_name: "test",
          family_name: "test",
          picture: "test",
        }),
      }
    )

    const data = await response.json()

    console.log("datadatadatadatadatadatadata", data)
    console.log(
      "data.error.data.codedata.error.data.codedata.error.data.codedata.error.data.codedata.error.data.code",
      data.error.data.code
    )
    expect(data.error.data.code).toBe("UNAUTHORIZED")
  })
})
