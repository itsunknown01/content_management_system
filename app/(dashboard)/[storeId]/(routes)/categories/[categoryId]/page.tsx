import React from "react";
import CategoryForm from "./_components/categories-form";
import { db } from "@/lib/db";

const CategoryIdPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const billboards = await db.billboard.findMany({
    where: { storeId: params.storeId },
  });

  if (params.categoryId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
          <CategoryForm billboards={billboards} />
        </div>
      </div>
    );
  } else {
    const category = await db.category.findUnique({
      where: { id: params.categoryId },
    });

    return (
      <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
          <CategoryForm data={category} billboards={billboards} />
        </div>
      </div>
    );
  }
};

export default CategoryIdPage;
