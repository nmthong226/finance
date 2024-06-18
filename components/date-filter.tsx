"use client";
import { useState } from "react";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";
import qs from "query-string";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from "@/components/ui/popover"
import { useLocale, useTranslations } from "next-intl";
import { enUS, vi } from "date-fns/locale";

export const DateFilter = () => {
    const router = useRouter();
    const pathName = usePathname();
    const params = useSearchParams();
    const accountId = params.get("accountId");
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);
    const paramState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo,
    }
    const [date, setDate] = useState<DateRange | undefined>(paramState);
    const pushToUrl = (dateRange: DateRange | undefined) => {
        const query = {
            from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
            to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
            accountId
        }
        const url = qs.stringifyUrl({
            url: pathName,
            query,
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    };
    const onReset = () => {
        setDate(undefined);
        pushToUrl(undefined);
    };
    const t = useTranslations('Filter');
    const locale = useLocale();
    const calendarLanguage = locale === "vn" ? vi : enUS;
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={false}
                    size={"sm"}
                    variant={"outline"}
                    className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
                >
                    <span>{formatDateRange(paramState, locale)}</span>
                    <ChevronDown className="ml-2 size-4 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-auto w-full p-0" align="start">
                <Calendar 
                    disabled={false}
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    locale={calendarLanguage}
                />
                <div className="p-4 w-full flex items-center gap-x-2">
                    <PopoverClose asChild>
                        <Button
                            onClick={onReset}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                            variant={"outline"}
                        >
                            {t('date-reset')}
                        </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                        <Button
                            onClick={() => pushToUrl(date)}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                            variant={"outline"}
                        >
                            {t('date-apply')}
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    )
}