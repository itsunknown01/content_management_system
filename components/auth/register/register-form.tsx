"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import CardWrapper from "@/components/auth/card-wrapper"
import { RegisterSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  })
  
  return (
    <CardWrapper
    heading="Content Management System"
    description="REGISTER"
    backButtonLink="/login"
    backButtonTitle="Already have an account"
    showSocial
    >
     <Form {...form}>
       <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
        <div className="space-y-4">
           <FormField 
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter email" type="email"  />
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
                  <Input {...field} placeholder="Enter email" type="text"  />
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
                  <Input {...field} placeholder="Enter password" type="email"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
           />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
       </form>
     </Form>
    </CardWrapper>
  )
}

export default RegisterForm