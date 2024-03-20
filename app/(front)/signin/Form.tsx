'use client'
import {signIn, useSession} from 'next-auth/react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect} from 'react'
import Link from 'next/link'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

type Inputs = {
    email: string
    password: string
}

const Form = () => {
    const {data: session} = useSession()

    const params = useSearchParams()
    let callbackUrl = params.get('callbackUrl') || '/'
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<Inputs>({
        defaultValues: {
            email: '',
            password: '',
        },
    })

    useEffect(() => {
        if (session && session.user) {
            router.push(callbackUrl)
        }
    }, [callbackUrl, params, router, session])

    const formSubmit: SubmitHandler<Inputs> = async (form) => {
        const {email, password} = form
        signIn('credentials', {
            email,
            password,
        })
    }
    return (
        <div className="px-5">
            <div className="w-full md:w-[500px] rounded-md mx-auto card bg-primary-foreground p-12 my-32 md:my-52">
                <h1 className="text-3xl font-semibold text-primary">Увійти</h1>
                {params.get('success') && (
                    <div className="alert text-success">{params.get('success')}</div>
                )}
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="my-5">
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
                            <div className="text-error">{errors.email.message}</div>
                        )}
                    </div>
                    <div className="my-5">
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
                        {params.get('error') && (
                            <div className="text-[12px] text-destructive">
                                {params.get('error') === 'CredentialsSignin'
                                    ? 'Invalid email or password'
                                    : params.get('error')}
                            </div>
                        )}
                        {errors.password?.message && (
                            <div className="text-error">{errors.password.message}</div>
                        )}
                    </div>
                    <div className="my-4">
                        <Button
                            disabled={isSubmitting}
                        >
                            {isSubmitting && (
                                <span className="loading loading-spinner"></span>
                            )}
                            Увійти
                        </Button>
                    </div>
                </form>
                <div className="text-sm">
                    Немає акаунту?{' '}
                    <Link className="text-base hover:underline text-blue-600" href={`/register?callbackUrl=${callbackUrl}`}>
                        Зареєструватись
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Form
