import { db } from "@/lib/db"
import { format } from "date-fns"
import CategoriesClient from "./_component/category-client"

const CategoryPage = async ({params} : {params : {storeId : string}}) => {
  const category = await db.category.findMany({
    where: {storeId : params.storeId},
    include: {billboard: true},
    orderBy: {createdAt: "desc"}
  })

  const formattedData = category.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  
    return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-0 pt-6">
         <CategoriesClient data={formattedData} />
        </div>
    </div>
  )
}

export default CategoryPage