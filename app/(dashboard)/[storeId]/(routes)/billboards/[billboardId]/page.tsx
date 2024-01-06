import React from 'react'
import BillboardForm from '@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/_components/billboard-form'

const BillboardIdPage = () => {
  return (
    <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
          <BillboardForm/>
        </div>
      </div>
  )
}

export default BillboardIdPage