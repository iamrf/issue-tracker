'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from "classnames"

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { label: 'Dashboard', href: "/" },
        { label: 'Issues', href: "/issues" },
    ]
    return (
        <nav className='flex items-center space-x-6 border-b mb-6 px-4 h-14'>
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-6'>
                {links.map(link => {
                    return <li key={link.label}>
                        <Link className={classnames({
                            'text-zinc-500': currentPath !== link.href,
                            'text-zinc-900': currentPath === link.href,
                            'transition-all': true,
                            'hover:text-zinc-800': true,
                        })} href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default NavBar