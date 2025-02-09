import { expect, test } from "@playwright/test"
import { getUsers } from "../../utils/getUsers"
import { getToken } from "../../utils/getToken"

test("Fetch Kinde access token", async () => {
  const token = await getToken()
  const users = await getUsers(token.access_token)
  //   const token = await getToken()
  await expect(users).toBeTruthy() // Ensure token is retrieved
})
