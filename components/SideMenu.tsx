'use client'
import React from 'react';

import Sidebar, {SidebarItem} from "@/components/Sidebar";
import {IoHomeOutline} from "react-icons/io5";
import {AiOutlineShopping} from "react-icons/ai";
import {BiCategory} from "react-icons/bi";
import {TbTruckDelivery} from "react-icons/tb";
import {MdHistoryToggleOff, MdOutlineContactSupport} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import Link from "next/link";
import {useSession} from 'next-auth/react'


const SideMenu = () => {
    const {data: session} = useSession()

    const handleClick = () => {
        ;(document.activeElement as HTMLElement).blur()
    }

    return (
        <Sidebar>
            {session && session.user &&
                session.user.isAdmin && (
                    <div onClick={handleClick}>
                        <Link href="/admin/dashboard"><SidebarItem icon={<IoHomeOutline size={20}/>}
                                                                   text="Admin Dashboard" active/></Link>
                    </div>
                )
            }
            <Link href={'/shop'}>
                <SidebarItem icon={<AiOutlineShopping size={20}/>} text="Магазин"/>
            </Link>
            <Link href={'/categories'}>
                <SidebarItem icon={<BiCategory size={20}/>} text="Категорії"/>
            </Link>
            <Link href={'/delivery'}>
                <SidebarItem icon={<TbTruckDelivery size={20}/>} text="Доставка"/>
            </Link>
            <Link href={'/contacts'}>
                <SidebarItem icon={<MdOutlineContactSupport size={20}/>} text="Контакти"/>
            </Link>
            <Link href={'/order-history'}>
                <SidebarItem icon={<MdHistoryToggleOff size={20}/>} text="Історія замовлень"/>
            </Link>
            <Link href={'/profile'}>
                <SidebarItem icon={<CgProfile size={20}/>} text="Профіль"/>
            </Link>
        </Sidebar>
    );
};
export default SideMenu;
