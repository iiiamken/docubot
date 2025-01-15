import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const page = () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()
  console.log("user", user)

  return <h1>Dashboard</h1>
}

export default page
