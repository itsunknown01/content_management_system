import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Copy, Server } from 'lucide-react'
import { Button } from './button'
import toast from 'react-hot-toast'
import { Badge, BadgeProps } from '@/components/ui/badge'

interface ApiAlertProps {
    title: string
    description: string
    variant: "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

const ApiAlert = ({
    title,
    description,
    variant = "public"
} : ApiAlertProps) => {
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description)
    toast.success("API Route copied to clipboard.")
  }
  return (
    <Alert>
        <Server className='h-4 w-4' />
        <AlertTitle className='flex items-center gap-x-2'>
            {title}
            <Badge variant={variantMap[variant]}>
                {textMap[variant]}
            </Badge>
        </AlertTitle>
        <AlertDescription className='mt-4 flex items-center justify-between'>
            <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                {description}
            </code>
            <Button variant="outline" size="sm" onClick={() => onCopy(description)}>
                <Copy className='w-4 h-4' />
            </Button>
        </AlertDescription>
    </Alert>
  )
}

export default ApiAlert