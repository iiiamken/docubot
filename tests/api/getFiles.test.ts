// test("Login and call tRPC authCallback", async ({ page, request }) => {
//   // Log in via UI
//   await page.goto("https://your-app.com/login")
//   await page.fill("#email", "testuser@example.com")
//   await page.fill("#password", "yourpassword")
//   await page.click("button[type='submit']")
//   await page.waitForNavigation()

//   // Get cookies from logged-in session
//   const cookies = await page.context().cookies()

//   // Make authenticated API request
//   const response = await request.get(
//     "http://localhost:3000/api/trpc/authCallback",
//     {
//       headers: {
//         Cookie: cookies.map((c) => `${c.name}=${c.value}`).join("; "),
//       },
//     }
//   )

//   expect(response.status()).toBe(200)
// })
