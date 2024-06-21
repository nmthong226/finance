import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useLocale, useTranslations } from "next-intl";
import { enUS, vi } from "date-fns/locale";

type Props = {
    value?: Date;
    onChange?: SelectSingleEventHandler;
    disabled?: boolean;
}

export const DatePicker = ({
    value,
    onChange,
    disabled,
}: Props) => {
    const t = useTranslations('TransactionHistory');
    const locale = useLocale();
    const calendarLanguage = locale === "vn" ? vi : enUS;
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
                >
                    <CalendarIcon className="size-4 mr-2" />
                    {value ? format(value, "PPP", {locale: calendarLanguage}) : <span>{t('date-select')}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={disabled}
                    initialFocus
                    locale={calendarLanguage}
                />
            </PopoverContent>
        </Popover>
    )
}