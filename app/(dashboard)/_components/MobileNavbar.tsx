"use client"

import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import NavbarLinks from './NavbarLinks'
import { ThemeSwitcherBtn } from '@/components/ThemeSwitcherBtn'
import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/router'

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='block border-separate bg-background md:hidden'>
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen} >
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"} >
              <Menu/>
            </Button>
          </SheetTrigger>
          <SheetContent className='w-[400px] sm:w-[540px] ' side={"left"} onClick={() => setIsOpen(false)} >
            <Logo/>
            <div className="flex flex-col gap-1 pt-4">
              <NavbarLinks/>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn/>
          <UserButton/>
        </div>
      </nav>
    </div>
  )
}

export default MobileNavbar