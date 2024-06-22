import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { useNewCategory } from "@/features/categories/hooks/use-new-category"
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { CategoryForm } from "@/features/categories/components/category-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useTranslations } from "next-intl";

const formSchema = insertCategorySchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>

export const NewCategorySheet = () => {
    const t = useTranslations('Category');
    const { isOpen, onClose } = useNewCategory();
    const mutation = useCreateCategory();
    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-8">
                <SheetHeader>
                    <SheetTitle>
                        {t('create-category-title')}
                    </SheetTitle>
                    <SheetDescription>
                        {t('create-category-content')}
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{
                        name: ""
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}