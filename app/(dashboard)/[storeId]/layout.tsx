import { db } from "@/lib/db";
import { getUserId } from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";

const StoreIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const userId = await getUserId()

  if (!userId) {
    redirect("/login");
  }

  const store = await db.store.findFirst({
    where: {
        id: params.storeId,
        userId
    }
  })

  if (!store) {
    redirect("/")
  }
  return <div>StoreIdLayout</div>;
};

export default StoreIdLayout;
