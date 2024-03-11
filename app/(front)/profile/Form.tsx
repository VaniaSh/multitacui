'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Form = () => {
  const { data: session, update } = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (session && session.user) {
      setValue('name', session.user.name!)
      setValue('email', session.user.email!)
    }
  }, [router, session, setValue])

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      if (res.status === 200) {
        toast.success('Profile updated successfully')
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            name,
            email,
          },
        }
        await update(newSession)
      } else {
        const data = await res.json()
        toast.error(data.message || 'error')
      }
    } catch (err: any) {
      const error =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message
      toast.error(error)
    }
  }
  return (
    <div className="max-w-screen-2xl mx-auto  my-4">
      <div className="border-secondary border bg-primary-foreground mx-auto rounded-md w-1/2 p-5">
        <h1 className="text-2xl font-semibold mb-5">Профіль</h1>
        <form className="space-y-4" onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label className="text-sm" htmlFor="name">
              Імʼя
            </label>
            <Input
              type="text"
              id="name"
              {...register('name', {
                required: 'Name is required',
              })}
            />
            {errors.name?.message && (
              <div className="text-error">{errors.name.message}</div>
            )}
          </div>
          <div className="my-2">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <Input
              type="text"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Email is invalid',
                },
              })}
            />
            {errors.email?.message && (
              <div className="text-error">{errors.email.message}</div>
            )}
          </div>
          <div className="my-2">
            <label className="text-sm" htmlFor="password">
              Новий пароль
            </label>
            <Input
              type="password"
              id="password"
              {...register('password', {})}
            />
            {errors.password?.message && (
              <div className="text-error">{errors.password.message}</div>
            )}
          </div>
          <div className="my-2">
            <label className="text-sm" htmlFor="confirmPassword">
              Повторіть новий пароль
            </label>
            <Input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                validate: (value) => {
                  const { password } = getValues()
                  return password === value || 'Passwords should match!'
                },
              })}
            />
            {errors.confirmPassword?.message && (
              <div className="text-error">{errors.confirmPassword.message}</div>
            )}
          </div>

          <div className="my-2">
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Оновити дані
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
