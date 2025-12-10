import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, RowData, useReactTable } from "@tanstack/react-table";

interface ITodoTable<T extends RowData> {
    data: T[],
    columns: ColumnDef<T>[],
    setRowSelection: React.Dispatch<React.SetStateAction<{}>>,
    rowSelection: {}
}

const TodoTable = <T extends RowData>({ data, columns, setRowSelection, rowSelection }: ITodoTable<T>) => {

    const table = useReactTable<T>({
        data,
        columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualSorting: true,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection
        },
    })

    return (
        <div className="flex justify-center">
            <table className="my-auto border w-full">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="border-b bg-gray-200 text-gray-800 uppercase">
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan} className="px-4 pr-2 py-4 font-medium text-left cursor-pointer"
                                        style={{ width: `${header.getSize()}px` }}
                                    >
                                        {header.isPlaceholder ?
                                            null :
                                            flexRender(header.column.columnDef.header, header.getContext())
                                        }
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-b">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-4 pt-[14px] pb-[18px]">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoTable;