import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import {
  fetchSalesData,
  selectSalesData,
  selectSalesStatus,
  selectSalesError,
} from "./salesSlice"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import { ArrowUpDown } from "lucide-react"
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  Column,
} from "@tanstack/react-table"

type SalesDataItem = {
  weekEnding: string
  retailSales: number
  wholesaleSales: number
  unitsSold: number
  retailerMargin: number
}

const columns: ColumnDef<SalesDataItem>[] = [
  {
    accessorKey: "weekEnding",
    header: ({ column }: { column: Column<SalesDataItem> }) => (
      <Button
        variant="ghost"
        className="w-full flex justify-start items-center p-0 text-left font-bold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Week Ending</span>
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted()
              ? column.getIsSorted() === "asc"
                ? "rotate-180"
                : ""
              : ""
          }`}
        />
      </Button>
    ),
  },
  {
    accessorKey: "retailSales",
    header: ({ column }: { column: Column<SalesDataItem> }) => (
      <Button
        variant="ghost"
        className="w-full flex justify-end items-center p-0 text-right font-bold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Retail Sales</span>
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted()
              ? column.getIsSorted() === "asc"
                ? "rotate-180"
                : ""
              : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) =>
      `$${(row.getValue("retailSales") as number).toLocaleString()}`,
  },
  {
    accessorKey: "wholesaleSales",
    header: ({ column }: { column: Column<SalesDataItem> }) => (
      <Button
        variant="ghost"
        className="w-full flex justify-end items-center p-0 text-right font-bold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Wholesale Sales</span>
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted()
              ? column.getIsSorted() === "asc"
                ? "rotate-180"
                : ""
              : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) =>
      `$${(row.getValue("wholesaleSales") as number).toLocaleString()}`,
  },
  {
    accessorKey: "unitsSold",
    header: ({ column }: { column: Column<SalesDataItem> }) => (
      <Button
        variant="ghost"
        className="w-full flex justify-end items-center p-0 text-right font-bold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Units Sold</span>
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted()
              ? column.getIsSorted() === "asc"
                ? "rotate-180"
                : ""
              : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (row.getValue("unitsSold") as number).toLocaleString(),
  },
  {
    accessorKey: "retailerMargin",
    header: ({ column }: { column: Column<SalesDataItem> }) => (
      <Button
        variant="ghost"
        className="w-full flex justify-end items-center p-0 text-right font-bold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Retailer Margin</span>
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted()
              ? column.getIsSorted() === "asc"
                ? "rotate-180"
                : ""
              : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) =>
      `$${(row.getValue("retailerMargin") as number).toLocaleString()}`,
  },
]

export const SalesTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const salesData = useSelector((state: RootState) => selectSalesData(state))
  const status = useSelector((state: RootState) => selectSalesStatus(state))
  const error = useSelector((state: RootState) => selectSalesError(state))
  const [sorting, setSorting] = useState<SortingState>([])

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSalesData())
    }
  }, [status, dispatch])

  const table = useReactTable({
    data: salesData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  if (status === "failed") {
    return <div>Error: {error || "An unknown error occurred"}</div>
  }

  return (
    <div className="overflow-auto">
      <Table className="min-w-full border-collapse">
        <TableHeader className="bg-gray-100 border-b sticky top-0">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="p-2 border-r">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {status === "loading" ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-gray-50 even:bg-gray-100"
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    className={
                      cell.column.id === "weekEnding"
                        ? "text-left p-2 border-r"
                        : "text-right p-2 border-r"
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
