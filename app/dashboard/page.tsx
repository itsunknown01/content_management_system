import { auth, signOut } from "@/auth"
import Image from "next/image"

const DashboardPage = async () => {
  const session = await auth()

  return (
    <div>
      {JSON.stringify(session)}

    <form action={async () => {
      "use server"

      await signOut()
    }}>
      <button className="bg-emerald-500">
        Sign Out
      </button>
    </form>
    </div>
  )
}

export default DashboardPage