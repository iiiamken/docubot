import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const Page = () => {
  //check login
  const { getUser } = getKindeServerSession()
  const user = getUser()
}
export default Page
