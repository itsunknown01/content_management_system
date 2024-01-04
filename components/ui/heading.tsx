import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import React from 'react'

interface HeadingProps {
    title: string
    description: string
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

const Heading = ({
    title, description
} : HeadingProps) => {
  return (
    <div className='w-full flex items-center justify-center flex-col gap-y-4'>
        <h1 className={cn("text-2xl font-semibold", font.className)}>
            {title}
        </h1>
        <p className=' text-muted-foreground text-sm'>
          {description}
        </p>
    </div>
  )
}

export default Heading