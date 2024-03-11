"use client"
import {MoreVertical} from "lucide-react"
import React, {useContext, createContext, useState, ReactNode} from "react"
import {GiHamburgerMenu} from "react-icons/gi";
import {MdLogout} from "react-icons/md";
import {signIn, signOut, useSession} from 'next-auth/react'
import useCartService from "@/lib/hooks/useCartStore";


interface SidebarContextProps {
    expanded: boolean;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

interface SidebarProps {
    children: ReactNode;
}

interface SidebarItemProps {
    red?: boolean,
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
}

export default function Sidebar({children}: SidebarProps) {
    const {items, init} = useCartService()
    const [expanded, setExpanded] = useState(false)
    const {data: session} = useSession()

    const signoutHandler = () => {
        signOut({callbackUrl: '/signin'})
        init()
    }

    return (
        <aside className="h-screen sticky top-0 left-0">
            <nav className="h-full flex flex-col bg-primary-foreground border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <div className={`overflow-hidden transition-all ${
                        expanded ? "w-32" : "w-0"
                    }`}>Multitac
                    </div>
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-primary-foreground/40 hover:bg-primary-foreground/40"
                    >
                        <GiHamburgerMenu size={20}/>
                    </button>
                </div>

                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                {
                    session && (
                        <div
                            className={`
                    hover:bg-indigo-50 text-gray-600
        relative flex justify-center items-center py-2 px-3 my-3 mx-3
        font-medium rounded-md cursor-pointer
        transition-colors group `}
                        >
                            <MdLogout className="text-destructive" size={20}/>
                            <div
                                className={`overflow-hidden transition-all whitespace-nowrap text-destructive ${
                                    expanded ? "w-52 ml-3" : "w-0"
                                }`}
                                onClick={signoutHandler}
                            >
                                Вийти
                            </div>


                            {!expanded && (
                                <div
                                    className={`
                         
                    w-fit whitespace-nowrap
          absolute left-full rounded-md px-3 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                                >
                                    Вийти
                                </div>
                            )}
                        </div>
                    )
                }
                <div className="border-t flex p-3">
                    <div className="w-10 h-10 rounded-md bg-gray-300"/>
                    <div
                        className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">{session && session.user.name}</h4>
                            <span className="text-xs text-gray-600">{session && session.user.email}</span>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export function SidebarItem({icon, text, active = false, alert = false, red = false}: SidebarItemProps) {
    // @ts-ignore
    const {expanded} = useContext(SidebarContext);

    return (
        <li
            className={`
        relative flex items-center py-2 px-3 my-3
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
                active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
            }
    `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all whitespace-nowrap ${
                    expanded ? "w-52 ml-3" : "w-0"
                }`}
            >
        {text}
      </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                        expanded ? "" : "top-2"
                    }`}
                />
            )}
        </li>
    )
}
