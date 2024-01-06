import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export interface billboardColumn {
    id: string,
    label: string
    createdAt: string
  }

  export const columns: ColumnDef<billboardColumn>[] = [
    {
      accessorKey: "label",
      header: "Label",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
    {
      id: "action",
      cell: ({row}) => <CellAction data={row.original} />
    }
  ]