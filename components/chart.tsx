import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AreaChartIcon, BarChart2Icon, FileSearch, LineChartIcon, Loader2 } from "lucide-react";
import { AreaVariant } from "@/components/area-variant";
import { BarVariant } from "@/components/bar-variant";
import { useState } from "react";
import { LineVariant } from "./line-variant";
import { Skeleton } from "./ui/skeleton";
import { useTranslations } from "next-intl";

type Props = {
    data?: {
        date: string;
        income: number;
        expenses: number;
    }[];
    activeLocale: string;
};

export const Chart = ({ data = [], activeLocale }: Props) => {
    const [chartType, setCharType] = useState("area");
    const onTypeChange = (type: string) => {
        setCharType(type);
    }
    const t = useTranslations('DataChart');
    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    {t('transactions')}
                </CardTitle>
                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="area">
                            <div className="flex items-center">
                                <AreaChartIcon className="size-4 mr-2 shrink-0"/>
                                <p className="line-clamp-1">
                                    {t('area-chart')}
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="bar">
                            <div className="flex items-center">
                                <BarChart2Icon className="size-4 mr-2 shrink-0"/>
                                <p className="line-clamp-1">
                                    {t('bar-chart')}
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="line">
                            <div className="flex items-center">
                                <LineChartIcon className="size-4 mr-2 shrink-0"/>
                                <p className="line-clamp-1">
                                    {t('line-chart')}
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                        <FileSearch className="size-6 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">
                            {t('not-found')}
                        </p>
                    </div>
                ) : (
                    <>
                        {chartType === "area" && <AreaVariant data={data} activeLocale={activeLocale}/>}
                        {chartType === "bar" && <BarVariant data={data} activeLocale={activeLocale}/>}
                        {chartType === "line" && <LineVariant data={data} activeLocale={activeLocale}/>}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export const ChartLoading = () => {
    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 lg:w-[120px] w-full" />
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
                </div>
            </CardContent>
        </Card>
    )
}