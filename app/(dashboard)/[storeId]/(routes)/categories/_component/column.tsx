import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export interface CategoryColumn {
    id: string
    name: string
    billboardLabel: string
    createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "billboard",
      header: "billboard",
      cell: ({ row }) => row.original.billboardLabel,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
    {
      id: "actions",
      cell: ({ row }) => <CellAction data={row.original} />
    },
  ];
  