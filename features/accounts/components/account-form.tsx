import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertAccountSchema } from "@/db/schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";

const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string,
    defaultValues?: FormValues,
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

export const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
}: Props) => {
    const t = useTranslations('Account');
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });
    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    };
    const handleDelete = () => {
        onDelete?.();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-2">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>
                                {t('name-field')}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder={t('name-placeholder')}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    className="w-full mb-4"
                    disabled={disabled}
                >
                    {id ? `${t('save-change')}` : `${t('create-account')}`}
                </Button>
                {!!id &&
                    <Button
                        type="button"
                        disabled={disabled}
                        onClick={handleDelete}
                        className="w-full mb-4"
                        variant={"outline"}
                    >
                        <Trash className="size-4 mr-2" />
                        {t('delete-account')}
                    </Button>
                }
            </form>
        </Form>
    )
}