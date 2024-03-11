import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Providers from '@/components/Providers'
import DrawerButton from '@/components/DrawerButton'
import Sidebar, {SidebarItem} from '@/components/Sidebar'
import Header from '@/components/header/Header'
import {IoHomeOutline} from "react-icons/io5";
import {AiOutlineShopping} from "react-icons/ai";
import {BiCategory} from "react-icons/bi";
import {TbTruckDelivery} from "react-icons/tb";
import {LuPersonStanding} from "react-icons/lu";
import SideMenu from "@/components/SideMenu";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Next Amazona V2',
    description: 'Modern ECommerce Website',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            <div className="min-h-screen flex">
                <div className="hidden lg:block">
                    <SideMenu/>
                </div>
                <div className="flex flex-col w-full">
                    <Header/>
                    {children}
                </div>
            </div>
        </Providers>
        </body>
        </html>
    )
}
