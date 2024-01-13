"use client";

import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./column";

interface CategoriesClientProps {
  data: CategoryColumn[];
}

const CategoriesClient = ({ data }: CategoriesClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Categories(${data.length})`}
          className="store"
          description="Manage category for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} searchkey="name" columns={columns} />
      <Heading title="API" className="store" description="API calls for Categories" />
      <Separator className="my-6" />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};

export default CategoriesClient;
