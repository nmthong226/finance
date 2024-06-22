import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react";
import { CategoryForm } from "@/features/categories/components/category-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useEditCategory } from "@/features/categories//api/use-edit-categories";
import { useDeleteCategory } from "@/features/categories//api/use-delete-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useConfirm } from "@/hooks/use-confirm";
import { useTranslations } from "next-intl";

const formSchema = insertCategorySchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>

export const EditCategorySheet = () => {
    const t = useTranslations('Category');
    const { isOpen, onClose, id } = useOpenCategory();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this category"
    )
    const categoryQuery = useGetCategory(id);
    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);
    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }
    const onDelete = async () => {
        {
            const ok = await confirm();
            if (ok) {
                deleteMutation.mutate(undefined, {
                    onSuccess: () => {
                        onClose();
                    }
                })
            }
        }
    }
    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name,
    } : {
        name: "",
    }
    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = categoryQuery.isLoading;
    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-8">
                    <SheetHeader>
                        <SheetTitle>
                            {t('edit-category-title')}
                        </SheetTitle>
                        <SheetDescription>
                            {t('edit-category-content')}
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ?
                        (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="animate-spin size-4 text-muted-foreground" />
                        </div>) :
                        <CategoryForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            defaultValues={defaultValues}
                            onDelete={onDelete}
                        />
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}