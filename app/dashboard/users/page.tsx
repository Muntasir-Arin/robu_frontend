"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, 
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import api from "@/utils/auth"



export type UserData = {
  id: number,
  idid :number,
  student_id :string,
  name: string,
  email: string,
  position: string
}

const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "idid", // Add the accessor key for id
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("idid")}</div>, // Display the ID value
  },
  
  {
    accessorKey: "student_id", // Add the accessor key for id
    header: "Student ID",
    cell: ({ row }) => <div>{row.getValue("student_id")}</div>, // Display the ID value
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("position")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div >{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  
  {
    id: "id",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const Users = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Promotion</DropdownMenuLabel>
      
            <DropdownMenuItem onClick={async () => {
            try {
              const response = await api.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/secure/${row.getValue("idid")}/`,
                { position: "Executive" }
              );

              toast.success('Promoted to Executive', {
                description: `${response.data.name} has been promoted to ${response.data.position}.`,
              });
            } catch (error) {
              console.error(error);
            }
          }}>
              To Executive
            </DropdownMenuItem>

            <DropdownMenuItem onClick={async () => {
            try {
              const response = await api.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/secure/${row.getValue("idid")}/`,
                { position: "Junior Executive" }
              );

              toast.success('Promoted to Junior Executive', {
                description: `${response.data.name} has been promoted to ${response.data.position}.`,
              });
            } catch (error) {
              console.error(error);
            }
          }}>
              To Junior Executive
            </DropdownMenuItem>

            <DropdownMenuItem onClick={async () => {
            try {
              const response = await api.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/secure/${row.getValue("idid")}/`,
                { position: "Apprentice" }
              );

              toast.success('Promoted to Apprentice', {
                description: `${response.data.name} has been promoted to ${response.data.position}.`,
              });
            } catch (error) {
              console.error(error);
            }
          }}>
              To Apprentice
            </DropdownMenuItem>

            <DropdownMenuItem onClick={async () => {
            try {
              const response = await api.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/secure/${row.getValue("idid")}/`,
                { position: "General Member" }
              );

              toast.success('Promoted to General Member', {
                description: `${response.data.name} has been promoted to ${response.data.position}.`,
              });
            } catch (error) {
              console.error(error);
            }
          }}>
              To General Member
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href={`/profile/member/${row.getValue("student_id")}`} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DataTableDemo() {
  const [data, setData] = React.useState<UserData[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/secure/`);
        // Extract only the required fields from each user object
        const userData = response.data.map((user: any) => ({
          id: user.id,
          idid: user.id,
          name: user.name,
          email: user.email,
          position: user.position,
          student_id :user.student_id
        }));
        setData(userData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full px-7">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
