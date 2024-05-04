"use client"

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const NavbarItem = ({label,href} : {label:string ; href:string}) => {
  const pathName = usePathname();
  const isActive = 
    (pathName === "/" && href === "/") ||
    (pathName === href) ||
    (pathName.startsWith(`${href}/`));

  return (
    <div className="relative flex items-center">
      <Link className={cn(
          buttonVariants({ variant: "ghost"}), "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )} 
        href={href}
      >
        {label}
      </Link>
      {
        isActive && (
          <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block"></div>
        )
      }
    </div>
  )
}

export default NavbarItem