"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Modal from "@/components/ui/modal";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { storeSchema } from "@/schemas/store";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StoreModal = () => {
  const { isOpen, onClose } = useModalStore();

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
    },
  });

  const Submit = async (values: z.infer<typeof storeSchema>) => {
    console.log(values);

    setError("");
    setSuccess("");
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);
      setSuccess("Store created!");
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(true);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage catregories and products"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(Submit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Enter the store name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
