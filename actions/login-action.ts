"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validations = LoginSchema.safeParse(values);

  if (!validations.success) {
    return {
      error: "Invalid Credentials",
    };
  }

  return {
    success: "Logged in successfully",
  };
};
