"use client";

import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./column";

interface ColorClientProps {
  data: ColorColumn[];
}

const ColorClient = ({ data }: ColorClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Color(${data.length})`}
          className="store"
          description="Manage colors for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} searchkey="name" columns={columns} />
      <Heading title="API" className="store" description="API calls for colors" />
      <Separator className="my-6" />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};

export default ColorClient;
