"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { forgotPassword } from "@/actions/forgot-password";
import CardWrapper from "@/components/auth/card-wrapper";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

const ForgotPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const Submithandler = (values: z.infer<typeof PasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      forgotPassword(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      heading="Content Management System"
      description="Forgot password"
      backButtonLink="/login"
      backButtonTitle="Go back to Login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(Submithandler)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={loading} type="submit" className="w-full">
            Send Verification mail
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotPasswordForm;
