"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  columns
} from "@/app/(dashboard)/[storeId]/(routes)/sizes/_components/column";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { SizeColumn } from "./column";

interface SizeClientProps {
  data: SizeColumn[];
}

const SizeClient = ({ data }: SizeClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      <div className="flex items-center justify-between pb-6">
        <Heading
          className="store"
          title={`Size(${data.length})`}
          description="Manage sizes for your products"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} searchkey="name" columns={columns} />
      <Heading className="store" title="API" description="API calls for size" />
      <Separator className="my-6" />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </div>
  );
};

export default SizeClient;
