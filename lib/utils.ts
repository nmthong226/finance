import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns"
import { enUS, vi } from "date-fns/locale";
import { getURL } from "next/dist/shared/lib/utils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000)
}

export function formatCurrency(value: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function calculatePercentageChange(
  current: number,
  previous: number,
) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
}

export function fillMissingDays(
  activeDays: {
    date: Date,
    income: number,
    expenses: number,
  }[],
  startDate: Date,
  endDate: Date,
) {
  if (activeDays.length === 0) {
    return [];
  }
  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  })
  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));
    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0
      }
    }
  });
  return transactionsByDay
}

type Period = {
  from: string | Date | undefined,
  to: string | Date | undefined,
}

export function formatDateRange(period?: Period, locale?: string) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);
  const language = locale == "vn" ? vi : enUS;
  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd", { locale: language })} - ${format(defaultTo, "LLL dd, y",  { locale: language })}`
  }
  if (period.to) {
    return `${format(period.from, "LLL dd", { locale: language })} - ${format(period.to, "LLL dd, y", { locale: language })}`
  }
  return format(period.from, "LLL dd, y")
}

export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = {
    addPrefix: false,
  },
) {
  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value / 100);
  if (options.addPrefix && value > 0) {
    return `+${result}`;
  }
  return result;
}