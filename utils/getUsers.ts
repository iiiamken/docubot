export async function getUsers(token: string) {
  try {
    const bearer = `Bearer ${token}`
    const response = await fetch("https://dokubot.kinde.com/api/authCallback", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: bearer,
      },
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const users = await response.json()
    console.log("usersusersusersusersusersusersusersusersusers", users)
    return users
  } catch (err) {
    console.error("error", err)
  }
}
