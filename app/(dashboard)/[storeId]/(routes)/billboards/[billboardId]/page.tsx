import React from 'react'
import BillboardForm from '@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/_components/billboard-form'
import { db } from '@/lib/db'

const BillboardIdPage = async ({params} : {params : {billboardId : string}}) => {
  if (params.billboardId === "new") {
    return (
    <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
          <BillboardForm />
        </div>
      </div>

    )
  }
  const billboard = await db.billboard.findUnique({
      where: { id: params.billboardId}
    })
  
  return (
    <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
          <BillboardForm data={billboard}/>
        </div>
      </div>
  )
}

export default BillboardIdPage