import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useConfirm } from "@/hooks/use-confirm";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transactions";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useTranslations } from "next-intl";

const formSchema = insertTransactionSchema.omit({
    id: true,
})

type FormValues = z.input<typeof formSchema>

export const EditTransactionSheet = () => {
    const t = useTranslations('TransactionHistory');
    const { isOpen, onClose, id } = useOpenTransaction();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction"
    )
    const transactionQuery = useGetTransaction(id);
    const editMutation = useEditTransaction(id);
    const deleteMutation = useDeleteTransaction(id);

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();
    const onCreateCategory = (name: string) => {
        categoryMutation.mutate({ name });
    }
    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
        label: category.name,
        value: category.id,
    }))
    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => {
        accountMutation.mutate({ name });
    }
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id,
    }))
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
    const isPending =
        editMutation.isPending ||
        deleteMutation.isPending ||
        transactionQuery.isLoading ||
        categoryMutation.isPending ||
        accountMutation.isPending;

    const isLoading =
        transactionQuery.isLoading ||
        categoryQuery.isLoading ||
        accountQuery.isLoading;

    const defaultValues = transactionQuery.data ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
    } : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: ""
    }
    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-8">
                    <SheetHeader>
                        <SheetTitle>
                            {t('edit-transaction-header')}
                        </SheetTitle>
                        <SheetDescription>
                            {t('edit-transaction-content')}
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ?
                        (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="animate-spin size-4 text-muted-foreground" />
                        </div>) :
                        <TransactionForm
                            id={id}
                            defaultValues={defaultValues}
                            onSubmit={onSubmit}
                            onDelete={onDelete}
                            disabled={isPending}
                            categoryOptions={categoryOptions}
                            onCreateCategory={onCreateCategory}
                            accountOptions={accountOptions}
                            onCreateAccount={onCreateAccount}
                        />
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}