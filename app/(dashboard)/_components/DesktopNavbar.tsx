import Logo from '@/components/Logo'
import React from 'react'
import NavbarLinks from './NavbarLinks'
import { UserButton } from '@clerk/nextjs'
import { ThemeSwitcherBtn } from '@/components/ThemeSwitcherBtn'

const DesktopNavbar = () => {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
        <nav className="container flex items-center justify-between px-8">
          <div className="flex h-[80px] mix-h-[60px] items-center gap-x-4 ">
              <Logo/>
              <div className="flex h-full">
                  <NavbarLinks/>
              </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcherBtn />
            <UserButton afterSignOutUrl='/sign-in'/>
          </div>
        </nav>
    </div>
  )
}

export default DesktopNavbar