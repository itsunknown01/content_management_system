"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import CardWrapper from "@/components/auth/card-wrapper"
import { RegisterSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { register } from "@/actions/register-action"
import FormError from "../form-error"
import FormSuccess from "../form-success"

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  })

  const Submithandler = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  
  return (
    <CardWrapper
    heading="Content Management System"
    description="REGISTER"
    backButtonLink="/login"
    backButtonTitle="Already have an account"
    showSocial
    >
     <Form {...form}>
       <form onSubmit={form.handleSubmit(Submithandler)} className="space-y-6">
        <div className="space-y-4">
           <FormField 
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} placeholder="Enter email" type="email"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
           />
           <FormField 
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} placeholder="Enter email" type="text"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
           />
           <FormField 
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} placeholder="Enter password" type="email"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
           />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={loading} className="w-full">
          Login
        </Button>
       </form>
     </Form>
    </CardWrapper>
  )
}

export default RegisterForm