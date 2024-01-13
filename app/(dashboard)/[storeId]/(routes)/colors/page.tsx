import React from 'react'
import ColorClient from './_component/color-client'
import { db } from '@/lib/db'
import { ColorColumn } from './_component/column'
import { format } from 'date-fns'

const ColorPage = async ({params} : {params : {storeId : string}}) => {
  const colors = await db.color.findMany({
    where: {storeId : params.storeId}
  })

  const formattedData: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className='flex-col'>
     <div className='flex-1 space-y-4 p-8 pt-6'>
      <ColorClient data={formattedData} />
     </div>
    </div>
  )
}

export default ColorPage