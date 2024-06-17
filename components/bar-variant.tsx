import { format } from "date-fns";
import { enUS, vi } from "date-fns/locale";
import {
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    BarChart,
    Bar
} from "recharts";
import { CustomToolTip } from "@/components/custom-tooltip";

type Props = {
    data?: {
        date: string;
        income: number;
        expenses: number;
    }[];
    activeLocale: string;
};

export const BarVariant = ({ data, activeLocale }: Props) => {
    const language = activeLocale === "vn" ? vi : enUS;
    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM", {locale: language})}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip content={<CustomToolTip/>}/>
                <Bar 
                    dataKey="income"
                    fill="#3b82f6"
                    className="drop-shadow-sm"
                />
                <Bar 
                    dataKey="expenses"
                    fill="#f43f5e"
                    className="drop-shadow-sm"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}