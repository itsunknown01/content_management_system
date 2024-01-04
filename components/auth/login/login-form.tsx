"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import FormError from "@/components/auth/form-error"
import FormSuccess from "@/components/auth/form-success"
import CardWrapper from "@/components/auth/card-wrapper"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const Submithandler = (values : z.infer<typeof LoginSchema>) => {
    console.log(values);
    
  }
  
  return (
    <CardWrapper
    heading="Content Management System"
    description="LOGIN"
    backButtonLink="/register"
    backButtonTitle="Don't have an account"
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
                  <Input {...field} placeholder="Enter email" type="email"  />
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
        {/* <FormError message="Invalid Credentials" /> */}
        {/* <FormSuccess message="Successfully Logged In" /> */}
        <Button type="submit" className="w-full">
          Login
        </Button>
       </form>
     </Form>
    </CardWrapper>
  )
}

export default LoginForm