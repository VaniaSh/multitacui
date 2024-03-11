'use client'
import CheckoutSteps from '@/components/CheckoutSteps'
import useCartService from '@/lib/hooks/useCartStore'
import {ShippingAddress} from '@/lib/models/OrderModel'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
import {SubmitHandler, ValidationRule, useForm} from 'react-hook-form'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const Form = () => {
    const router = useRouter()
    const {saveShippingAddrress, shippingAddress} = useCartService()
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors, isSubmitting},
    } = useForm<ShippingAddress>({
        defaultValues: {
            fullName: '',
            address: '',
            city: '',
        },
    })

    useEffect(() => {
        setValue('fullName', shippingAddress.fullName)
        setValue('address', shippingAddress.address)
        setValue('city', shippingAddress.city)
    }, [setValue, shippingAddress])

    const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
        saveShippingAddrress(form)
      console.log(form)
        router.push('/payment')
    }

    const FormInput = ({
                           id,
                           name,
                           required,
                           pattern,
                           placeholder,
                       }: {
        id: keyof ShippingAddress
        name: string
        required?: boolean
        placeholder: string,
        pattern?: ValidationRule<RegExp>
    }) => (
        <div className="mb-2">
            <label className="label" htmlFor={id}>
                {name}
            </label>
            <Input
                placeholder={placeholder}
                type="text"
                id={id}
                {...register(id, {
                    required: required && `${name} is required`,
                    pattern,
                })}
                className="w-full"
            />
            {errors[id]?.message && (
                <div className="text-error">{errors[id]?.message}</div>
            )}
        </div>
    )

    return (
        <div>
            <CheckoutSteps current={1}/>
            <div className="max-w-screen-2xl px-5 mx-auto my-4">
                <div className="mt-12 w-full md:w-1/3 mx-auto">
                    <h1 className="text-xl font-semibold mb-4">Адреса доставки</h1>
                    <form onSubmit={handleSubmit(formSubmit)} className="space-y-5">
                        <FormInput placeholder={"Ваше імʼя та прізвище"} name="Full Name"
                               id="fullName" required/>
                        <FormInput placeholder={"Відділення НП"} name="Address" id="address" required/>
                        <FormInput placeholder={"Місто "} name="City" id="city" required/>
                        <div className="my-2">
                            <Button
                                type={"submit"}
                                size={"lg"}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && (
                                    <span className="loading loading-spinner"></span>
                                )}
                                Далі
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Form
