import { format } from "date-fns";
import { enUS, vi } from "date-fns/locale";
import {
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    LineChart,
    Line
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

export const LineVariant = ({ data, activeLocale }: Props) => {
    const language = activeLocale === "vn" ? vi : enUS;    
    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM", { locale: language })}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip content={<CustomToolTip />} />
                <Line
                    dot={false}
                    dataKey="income"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
                <Line
                    dot={false}
                    dataKey="expenses"
                    stroke="#f43f5e"
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}