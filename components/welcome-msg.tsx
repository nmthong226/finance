"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'

const WelcomeMsg = () => {
    const {user, isLoaded} = useUser();
    return (
        <div className='space-y-2 mb-4'>
            <h2 className='text-lg xs:text-2xl lg:text-4xl text-white font-medium'>
                Xin chào{isLoaded ? ", " + user?.firstName : " "} 👋
            </h2>
            <p className='text-sm lg:text-base text-[#89b6fd]'>
                Đây là trang báo cáo tài chính của bạn
            </p>
        </div>
    )
}

export default WelcomeMsg