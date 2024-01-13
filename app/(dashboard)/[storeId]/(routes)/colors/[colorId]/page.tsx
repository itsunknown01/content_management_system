import React from "react";
import ColorForm from "./_components/color-form";
import { db } from "@/lib/db";

const ColorIdPage = async ({ params }: { params: { colorId: string } }) => {
  if (params.colorId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ColorForm />
        </div>
      </div>
    );
  } else {
    const color = await db.color.findUnique({
      where: { id: params.colorId },
    });
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ColorForm data={color} />
        </div>
      </div>
    );
  }
};

export default ColorIdPage;
