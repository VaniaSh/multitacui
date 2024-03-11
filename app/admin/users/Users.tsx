'use client'

import { User } from '@/lib/models/UserModel'
import { formatId } from '@/lib/utils'
import Link from 'next/link'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import React from "react";

export default function Users() {
  const { data: users, error } = useSWR(`/api/admin/users`)
  const { trigger: deleteUser } = useSWRMutation(
    `/api/admin/users`,
    async (url, { arg }: { arg: { userId: string } }) => {
      const toastId = toast.loading('Deleting user...')
      const res = await fetch(`${url}/${arg.userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      res.ok
        ? toast.success('User deleted successfully', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          })
    }
  )
  if (error) return 'An error has occurred.'
  if (!users) return 'Завантаження...'

  return (
    <div>
      <h1 className="py-4 text-2xl">Користувачі</h1>

      <div className="overflow-x-auto max-w-screen-2xl mx-auto">
        <table className="w-full">
          <thead className="p-3">
            <tr className="text-left bg-secondary">
              <th className="p-3">Id</th>
              <th className="p-3">Імʼя</th>
              <th className="p-3">Email</th>
              <th className="p-3">Статус</th>
              <th className="p-3">Дії</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
                <tr key={user._id}>
                    <td className="p-3">{formatId(user._id)}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.isAdmin ? 'Адміністратор' : 'Клієнт'}</td>
                    <td className="p-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <DotsHorizontalIcon className="w-5 h-5"/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-40">
                                <DropdownMenuItem>
                                    <Button
                                        className="w-full"
                                        variant={"outline"}>
                                        <Link
                                            href={`/admin/users/${user._id}`}
                                            type="button"
                                        >
                                            Редагувати
                                        </Link>
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem><Button
                                    className="w-full"
                                    variant={'destructive'}
                                    onClick={() => deleteUser({userId: user._id})}
                                    type="button"
                                >
                                    Видалити
                                </Button></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
