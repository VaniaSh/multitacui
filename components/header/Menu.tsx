'use client'
import useCartService from '@/lib/hooks/useCartStore'
import {signIn, signOut, useSession} from 'next-auth/react'
import {FiShoppingCart} from "react-icons/fi";
import {AiOutlineUser} from "react-icons/ai";

import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {SearchBox} from './SearchBox'
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/ui/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Menu = () => {
    const {items} = useCartService()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const {data: session} = useSession()


    if (!mounted) return <></>

    return (
        <div className="flex items-center gap-x-3">
            <ModeToggle/>
            <div className="flex items-center gap-x-3">
                <Link className="btn btn-ghost rounded-btn" href="/cart">
                    <Button variant={'outline'} size={"icon"}>
                        <>
                            <FiShoppingCart size={'20px'}/>
                            {mounted && items.length != 0 && (
                                <div className="badge badge-secondary">
                                    {items.reduce((a, c) => a + c.qty, 0)}{' '}
                                </div>
                            )}
                        </>
                    </Button>
                </Link>
                {!session && (
                    <Button
                        type="button"
                        onClick={() => signIn()}
                    >
                        Увійти
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Menu
