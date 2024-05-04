import React from 'react'
import NavbarItem from './NavbarItem';

const links = [
    { name: "Dashboard", href: "/" },
    { name: "Transactions", href: "/transactions" },
    { name: "Manage", href: "/manage" },
  ];

const NavbarLinks = () => {
  return (
    <>  
        {links.map((link) => (
            <NavbarItem
                key={link.name}
                label={link.name}
                href={link.href}  
            />
        ))}
    </>
  )
}

export default NavbarLinks