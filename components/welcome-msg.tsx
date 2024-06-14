"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'

const WelcomeMsg = () => {
    const t = useTranslations('WelcomeMsg')
    const {user, isLoaded} = useUser();
    return (
        <div className='space-y-2 mb-4'>
            <h2 className='text-lg xs:text-2xl lg:text-4xl text-white font-medium'>
                {t('title')}{isLoaded ? ", " + user?.firstName : " "} 👋
            </h2>
            <p className='text-sm lg:text-base text-[#89b6fd]'>
                {t('intro')}
            </p>
        </div>
    )
}

export default WelcomeMsg