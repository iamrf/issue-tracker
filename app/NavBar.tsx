'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from "classnames"
import { useSession } from "next-auth/react"
import { Box } from '@radix-ui/themes'

const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession()
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
            <Box>
                {status === 'authenticated' && <Link href="/api/auth/signout">Sing Out</Link>}
                {status === 'unauthenticated' && <Link href="/api/auth/signin">Sing In</Link>}
            </Box>
        </nav>
    )
}

export default NavBar