"use client"
import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { formatDateRange } from '@/lib/utils';
import { useGetSummary } from '@/features/summary/api/use-get-summary';
import { DataCard, DataCardLoading } from '@/components/data-card';
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useTranslations } from 'next-intl';


const DataGrid = () => {
    const { data, isLoading } = useGetSummary();
    const params = useSearchParams();
    const to = params.get("to") || undefined;
    const from = params.get("from") || undefined;
    const getLanguagePart = usePathname().split("/");
    const locale = getLanguagePart[1];
    const dateRangeLabel = formatDateRange({ to, from }, locale);
    const t = useTranslations('DataGrid');
    if (isLoading) {
        return (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
                <DataCardLoading />
                <DataCardLoading />
                <DataCardLoading />
            </div>
        )
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
            <DataCard
                title={t('remaining')}
                value={data?.remainingAmount}
                percentageChange={data?.remainingChange}
                icon={FaPiggyBank}
                dateRange={dateRangeLabel}
            />
            <DataCard
                title={t('income')}
                value={data?.incomeAmount}
                percentageChange={data?.incomeChange}
                icon={FaArrowTrendUp}
                dateRange={dateRangeLabel}
            />
            <DataCard
                title={t('expenses')}
                value={data?.expensesAmount}
                percentageChange={data?.expensesChange}
                icon={FaArrowTrendDown}
                dateRange={dateRangeLabel}
            />
        </div>
    )
}

export default DataGrid