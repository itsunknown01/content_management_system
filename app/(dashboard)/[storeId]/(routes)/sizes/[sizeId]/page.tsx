import React from "react";
import SizeForm from "./_components/size-form";
import { db } from "@/lib/db";

const SizeIdage = async ({ params }: { params: { sizeId: string } }) => {
  if (params.sizeId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SizeForm />
        </div>
      </div>
    );
  } else {
    const size = await db.size.findUnique({
      where: { id: params.sizeId },
    });

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SizeForm data={size} />
        </div>
      </div>
    );
  }
};

export default SizeIdage;
