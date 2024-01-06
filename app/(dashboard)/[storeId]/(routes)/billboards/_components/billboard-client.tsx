"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import {
  billboardColumn,
  columns,
} from "@/app/(dashboard)/[storeId]/(routes)/billboards/_components/column"
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ApiList from "@/components/ui/api-list";

interface billboardClientProps {
  data: billboardColumn[];
}

const BillboardClient = ({ data }: billboardClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      <div className="flex items-center justify-between pb-6">
        <Heading
          className="store"
          title={`Billboard(${data.length})`}
          description="Manage billboards for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} searchkey="label" columns={columns} />
      <Heading className="store" title="API" description="API calls for Main billboard" />
      <Separator className="my-6" />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </div>
  );
};

export default BillboardClient;
