'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from "classnames"
import { useSession } from "next-auth/react"
import { Box, Container, Flex } from '@radix-ui/themes'

const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession()
    const links = [
        { label: 'Dashboard', href: "/" },
        { label: 'Issues', href: "/issues" },
    ]
    return (
        <nav className='border-b mb-6 px-4 py-4'>
            <Container>
                <Flex align="center" justify="between">
                    <Flex align="center" gap="4">
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
                    </Flex>
                    <Box>
                        {status === 'authenticated' && <Link href="/api/auth/signout">Sing Out</Link>}
                        {status === 'unauthenticated' && <Link href="/api/auth/signin">Sing In</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar