'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
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
  const { data: session } = useSession()

  const params = useSearchParams()
  const router = useRouter()
  let callbackUrl = params.get('callbackUrl') || '/'
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session])

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      if (res.ok) {
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
        )
      } else {
        const data = await res.json()
        throw new Error(data.message)
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf('E11000') === 0
          ? 'Email is duplicate'
          : err.message
      toast.error(error || 'error')
    }
  }
  return (
      <div className="w-[500px] rounded-md mx-auto card bg-primary-foreground p-12 my-52">
        <div>
          <h1 className="text-3xl font-semibold text-primary">Реєстрація</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="my-2">
              <label className="text-base text-primary/40" htmlFor="name">
                Повне імʼя
              </label>
              <Input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                  })}
              />
              {errors.name?.message && (
                  <div className="text-destructive text-[12px]">{errors.name.message}</div>
              )}
            </div>
            <div className="my-2">
              <label className="text-base text-primary/40" htmlFor="email">
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
                  className="input input-bordered w-full max-w-sm"
              />
              {errors.email?.message && (
                  <div className="text-destructive text-[12px]"> {errors.email.message}</div>
              )}
            </div>
            <div className="my-2">
              <label className="text-base text-primary/40" htmlFor="password">
                Пароль
              </label>
              <Input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className="input input-bordered w-full max-w-sm"
              />
              {errors.password?.message && (
                  <div className="text-destructive text-[12px]">{errors.password.message}</div>
              )}
            </div>
            <div className="my-2">
              <label className="text-base text-primary/40" htmlFor="confirmPassword">
                Повторіть пароль
              </label>
              <Input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (value) => {
                      const {password} = getValues()
                      return password === value || 'паролі повинні співпадати!'
                    },
                  })}
                  className="input input-bordered w-full max-w-sm"
              />
              {errors.confirmPassword?.message && (
                  <div className="text-destructive text-[12px]">{errors.confirmPassword.message}</div>
              )}
            </div>
            <div className="my-4">
              <Button
                  type="submit"
                  disabled={isSubmitting}
              >
                {isSubmitting && (
                    <span className="loading loading-spinner"></span>
                )}
                Зареєструватись
              </Button>
            </div>
          </form>

          <div className="divider"></div>
          <div className="text-sm">
            Маєте акаунт?{' '}
            <Link className="text-base hover:underline" href={`/signin?callbackUrl=${callbackUrl}`}>
              Увійти
            </Link>
          </div>
        </div>
      </div>
  )
}

export default Form
