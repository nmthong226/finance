"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { useOpenCategory } from "@/features/categories/hooks/use-open-category"
import { useDeleteCategory } from "@/features/categories/api/use-delete-category"
import { useConfirm } from "@/hooks/use-confirm"
import { useTranslations } from "next-intl"

type Props = {
    id: string,
}

export const Actions = ({ id }: Props) => {
    const t = useTranslations('Category');
    const { onOpen } = useOpenCategory();
    const [ConfirmDialog, confirm] = useConfirm(
        t('delete-confirm-title'),
        t('delete-confirm-content')
    )
    const deleteMutation = useDeleteCategory(id);
    const handleDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate();
        }
    }
    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={() => onOpen(id)}
                    >
                        <Edit className="size-4 mr-2" />
                        {t('edit-action')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={handleDelete}
                    >
                        <Trash className="size-4 mr-2" />
                        {t('delete-action')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}