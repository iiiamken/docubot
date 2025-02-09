// const CLIENT_ID = process.env.KINDE_CLIENT_ID || ""
// const KINDE_CLIENT_SECRET = process.env.KINDE_CLIENT_SECRET || ""
export async function getToken() {
  try {
    const response = await fetch(`https://dokubot.kinde.com/oauth2/token`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        audience: "https://dokubot.kinde.com/api",
        grant_type: "client_credentials",
        client_id: "",
        client_secret: "",
      }),
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const token = await response.json()
    console.log(token)
    return token
  } catch (error) {
    console.error("err", error)
  }
}
