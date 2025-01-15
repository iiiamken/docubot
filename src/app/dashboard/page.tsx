import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const page = () => {
  return <h1>Dashboard</h1>

  const { getUser } = getKindeServerSession()
  const user = getUser()
  console.log(user)
}

export default page
