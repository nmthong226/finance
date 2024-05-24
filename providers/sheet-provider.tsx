"use client"
import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet';
import { useMountedState } from 'react-use';
import React from 'react'

export const SheetProvider = () => {
    const isMounted = useMountedState();
    if (!isMounted) return null;
    return (
        <>
            <NewAccountSheet />
        </>
    )
}