import StoreNavbar from '@/components/layout/store-navbar'
import StoreSwitcher from '@/components/layout/store-switcher'
import { db } from '@/lib/db'
import { getUserId } from "@/lib/user"
import { redirect } from 'next/navigation'
import Logout from '../ui/logout'

const StoreHeader = async () => {
    const userId = await getUserId()

    if (!userId) {
      redirect("/login")
    }

    const stores = await db.store.findMany({
      where: {
        userId
      }
    })

  return (
    <div className="border-b shadow-xl">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <StoreNavbar className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Logout />
        </div>
      </div>
    </div>
  )
}

export default StoreHeader