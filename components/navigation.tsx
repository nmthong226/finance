"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import NavButton from './nav-button'
const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
]
const Navigation = () => {
  const pathName = usePathname();
  return (
    <nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
      {
        routes.map((route) => {
          return (
            <NavButton 
              key={route.href}
              href={route.href}
              label={route.label}
              isActive={pathName === route.href}
            />
          )
        })
      }
    </nav>
  )
}

export default Navigation