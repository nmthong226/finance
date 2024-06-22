"use client"
import * as React from "react"

import {
    ColumnDef,
    ColumnFiltersState,
    Row,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useConfirm } from "@/hooks/use-confirm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useLocale, useTranslations } from "next-intl"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filterKey: string
    onDelete: (rows: Row<TData>[]) => void
    disabled: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterKey,
    onDelete,
    disabled,
}: DataTableProps<TData, TValue>) {
    const locale = useLocale();
    const t = useTranslations('TransactionHistory');
    const [ConfirmDialog, confirm] = useConfirm(
        t('confirm-question'),
        t('confirm-content')
    )
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection
        },
    });
    const localeFilterKey = (filterKey: string, locale: string) => {
        const translations: { [key: string]: { [locale: string]: string } } = {
            payee: {
                vn: "người nhận",
                en: "payee"
            },
            name: {
                vn: "tên",
                en: "name"
            }
        };
        const filterKeyName = translations[filterKey]?.[locale] || translations['name'][locale] || 'name';
        return `${t('filter')} ${filterKeyName}...`;
    };
    return (
        <div>
            <ConfirmDialog />
            <div className="flex items-center py-4">
                <Input
                    placeholder={localeFilterKey(filterKey, locale)}
                    value={(table.getColumn(`${filterKey}`)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(`${filterKey}`)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <Button
                        disabled={disabled}
                        size={"sm"}
                        variant={"outline"}
                        className="ml-auto font-normal text-xs"
                        onClick={async () => {
                            const ok = await confirm();
                            if (ok) {
                                onDelete(table.getFilteredSelectedRowModel().rows)
                                table.resetRowSelection();
                            }
                        }}
                    >
                        <Trash className="size-4 mr-2" />
                        {t('delete')} ({table.getFilteredSelectedRowModel().rows.length})
                    </Button>
                )}
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
                                    data-state={row.getIsSelected() && `${t('selected')}`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {t('no-result')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-xs text-muted-foreground xs:text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} {t('own')}{" "}
                    {table.getFilteredRowModel().rows.length} {t('select-show')}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {t('previous')}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {t('next')}
                </Button>
            </div>
        </div>
    )
}
