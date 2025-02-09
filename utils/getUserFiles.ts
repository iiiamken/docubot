export async function fetchUserFiles() {
  const response = await fetch(
    "https://dokubot.kinde.com/api/trpc/getUserFiles",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: { userId: "" }, // Pass userId dynamically
        // Pass userId dynamically
      }),
    }
  )

  const result = await response.json()
  console.log(result) // Check response
  return result
}
