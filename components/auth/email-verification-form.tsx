"use client"

import { useCallback, useEffect, useState } from 'react'
import {BeatLoader} from "react-spinners"

import CardWrapper from '@/components/auth/card-wrapper'
import FormSuccess from './form-success'
import FormError from './form-error'
import { useSearchParams } from 'next/navigation'
import { verificaiton } from '@/actions/email-verification'

const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const submitHandler = useCallback(() => {
    if (success || error) return;

    if (!token) {
        setError("Missing token")
        return;
    }

    verificaiton(token)
    .then((data) => {
        setSuccess(data?.success)
        setError(data?.error)
    }).catch(() => {
        setError("Something went wrong")
    })

  },[token, success, error])

  useEffect(() => {
    submitHandler()
  },[submitHandler])

  return (
    <CardWrapper
    heading='Content Management System'
    description='Confirming your verificaiton'
    backButtonLink='/login'
    backButtonTitle='Back to Login'
    >
     <div className='flex items-center w-full justify-center'>
        {!success && !error && (
            <BeatLoader />
        )}
        <FormSuccess message={success} />
        {!success && (
            <FormError message={error} />
        )}
     </div>
    </CardWrapper>
  )
}

export default EmailVerificationForm