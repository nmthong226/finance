import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react";
import { AccountForm } from "@/features/accounts/components/account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useEditAccount } from "@/features/accounts/api/use-edit-accounts";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";
import { useTranslations } from "next-intl";

const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>

export const EditAccountSheet = () => {
    const t = useTranslations('Account');
    const { isOpen, onClose, id } = useOpenAccount();
    const [ConfirmDialog, confirm] = useConfirm(
        t('delete-confirm-title'),
        t('delete-confirm-content')
    )
    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);
    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }
    const onDelete = async () => {{
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            })
        }
    }}
    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name,
    } : {
        name: "",
    }
    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = accountQuery.isLoading;
    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-8">
                    <SheetHeader>
                        <SheetTitle>
                            {t('edit-account-header')}
                        </SheetTitle>
                        <SheetDescription>
                            {t('edit-account-content')}
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ?
                        (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="animate-spin size-4 text-muted-foreground" />
                        </div>) :
                        <AccountForm
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