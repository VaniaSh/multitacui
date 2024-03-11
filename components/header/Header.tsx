import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import MobileMenu from "@/components/Mobile-Menu";

const Header = () => {
    return (
        <header
            className="sticky backdrop-blur-md z-20 top-0 bg-zinc-500/10 border-b border-bg-zinc-500/10 flex justify-between items-center px-5 h-[65px]">
            <MobileMenu/>
            <Link href="/" className="text-2xl font-bold tracking-wide">
                MULTITAC
            </Link>
            <Menu/>
        </header>
    )
}

export default Header
