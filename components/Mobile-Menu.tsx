'use client'
import React, {FC, useEffect, useState} from 'react';
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {HiOutlineMenuAlt2} from "react-icons/hi";

type PageProps = {};


const MobileMenu: FC<PageProps> = ({}) => {
    const [mounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!mounted) return <></>
    return (
        <Sheet>
            <SheetTrigger className={"block lg:hidden"}>
                <Button size={'icon'}>
                    <HiOutlineMenuAlt2 size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};
export default MobileMenu
