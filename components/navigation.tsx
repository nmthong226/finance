"use client"
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import NavButton from './nav-button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useMedia } from "react-use"
import { Button } from './ui/button'
import { Menu } from 'lucide-react'

const getRoutes = (locale: string) => {
  const t = useTranslations('Navigations');
  const routes = [
    {
      href: `/${locale}`,
      label: t('general'),
    },
    {
      href: `/${locale}/transactions`,
      label: t('transactions'),
    },
    {
      href: `/${locale}/accounts`,
      label: t('accounts'),
    },
    {
      href: `/${locale}/categories`,
      label: t('categories'),
    },
    {
      href: `/${locale}/settings`,
      label: t('setup'),
    },
  ]
  return routes;
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const isMobile = useMedia("(max-width:1024px)", false);
  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  }
  const getLanguagePart = usePathname().split("/");
  const routes = getRoutes(getLanguagePart[1]);
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className='font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0
            focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition'
          >
            <Menu className='size-4' />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className='flex flex-col gap-y-2 pt-6'>
            {routes.map((route) => {
              return (
                <Button
                  key={route.href}
                  variant={route.href === pathName ? "secondary" : "ghost"}
                  onClick={() => onClick(route.href)}
                  className='w-full justify-start'
                >
                  {route.label}
                </Button>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }
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