import { db } from "@/lib/db";
import { getUserId } from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";

const StoresLayout = async ({ children }: { children: React.ReactNode }) => {
  const userId = await getUserId();

  if (!userId) {
    redirect("/login");
  }

  const store = await db.store.findFirst({
    where: {
        userId
    }
  })

  if (store) {
    redirect(`/${store.id}`)
  }

  return <>{children}</>;
};

export default StoresLayout;
