"use client"
import { InferResponseType } from "hono"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { client } from "@/lib/hono"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Actions } from "./actions"
import { format } from "date-fns"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AccountColumn } from "./account-column"
import { CategoryColumn } from "./category-column"
import { useLocale, useTranslations } from "next-intl"
import { enUS, vi } from "date-fns/locale"

export type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            const t = useTranslations('TransactionHistory');
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0 m-0"
                >
                    {t('date-column')}
                    < ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue("date") as Date;
            const locale = useLocale();
            const dateFormat = locale === "vn" ? vi : enUS;
            return (
                <span>
                    {format(date, "dd MMMM, yyyy", { locale: dateFormat})}
                </span>
            )
        }
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            const t = useTranslations('TransactionHistory');
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0 m-0"
                >
                    {t('category-column')}
                    < ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <CategoryColumn
                    id={row.original.id}
                    category={row.original.category}
                    categoryId={row.original.categoryId}
                />
            )
        }
    },
    {
        accessorKey: "payee",
        header: ({ column }) => {
            const t = useTranslations('TransactionHistory');
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0 m-0"
                >
                    {t('account-column')}
                    < ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            const t = useTranslations('TransactionHistory');
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0 m-0"
                >
                    {t('amount-column')}
                    < ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            return (
                <Badge
                    variant={amount < 0 ? "destructive" : "primary"}
                    className="text-xs font-medium px-3.5 py-2.5"
                >
                    {formatCurrency(amount)}
                </Badge>
            )
        }
    },
    {
        accessorKey: "account",
        header: ({ column }) => {
            const t = useTranslations('TransactionHistory');
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0 m-0"
                >
                    {t('account-column')}
                    < ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <AccountColumn
                    account={row.original.account}
                    accountId={row.original.accountId}
                />
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <Actions id={row.original.id} />
    }
];