import { format } from "date-fns";
import { SizeColumn } from "./_components/column";
import SizeClient from "./_components/size-client";
import { db } from "@/lib/db";

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await db.size.findMany({
    where: { storeId: params.storeId },
  });

  const formattedData: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <SizeClient data={formattedData} />
      </div>
    </div>
  );
};

export default SizePage;
