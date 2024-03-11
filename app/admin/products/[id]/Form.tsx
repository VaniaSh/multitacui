'use client'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ValidationRule, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Product } from '@/lib/models/ProductModel'
import { formatId } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function ProductEditForm({ productId }: { productId: string }) {
  const { data: product, error } = useSWR(`/api/admin/products/${productId}`)
  const router = useRouter()
  const { trigger: updateProduct, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/products/${productId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message)

      toast.success('Товар успішно оновлено')
      router.push('/admin/products')
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>()

  useEffect(() => {
    if (!product) return
    setValue('name', product.name)
    setValue('slug', product.slug)
    setValue('price', product.price)
    setValue('image', product.image)
    setValue('category', product.category)
    setValue('brand', product.brand)
    setValue('countInStock', product.countInStock)
    setValue('description', product.description)
  }, [product, setValue])

  const formSubmit = async (formData: any) => {
    await updateProduct(formData)
  }

  if (error) return error.message
  if (!product) return 'Завантаження...'

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Product
    name: string
    required?: boolean
    pattern?: ValidationRule<RegExp>
  }) => (
    <div className="md:flex mb-6">
      <label className="label md:w-1/5" htmlFor={id}>
        {name}
      </label>
      <div className="md:w-4/5">
        <Input
          type="text"
          className="border-secondary"
          id={id}
          {...register(id, {
            required: required && `${name} is required`,
            pattern,
          })}
        />
        {errors[id]?.message && (
          <div className="text-error">{errors[id]?.message}</div>
        )}
      </div>
    </div>
  )

  const uploadHandler = async (e: any) => {
    const toastId = toast.loading('Картинка Завантажується...')
    try {
      const resSign = await fetch('/api/cloudinary-sign', {
        method: 'POST',
      })
      const { signature, timestamp } = await resSign.json()
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('signature', signature)
      formData.append('timestamp', timestamp)
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      setValue('image', data.secure_url)
      toast.success('Успішно', {
        id: toastId,
      })
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      })
    }
  }

  return (
    <div>
      <h1 className="text-2xl py-4 bg-primary-foreground px-4 mb-2 rounded mt-4">Редагувати {formatId(productId)}</h1>
      <div className="bg-primary-foreground p-3 rounded">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="w-[600px]">
            <FormInput name="Назва товару" id="name" required />
          </div>
          <div className="w-[600px]">
            <FormInput name="Slug" id="slug" required />
          </div>
          <div className="w-[600px]">
            <FormInput name="Картинка" id="image" required />
          </div>
          <div className="md:flex mb-6">
            <label className="label md:w-1/5" htmlFor="imageFile">
              Загрузити Картинку
            </label>
            <div className="md:w-4/5">
              <input
                type="file"
                className="max-w-md"
                id="imageFile"
                onChange={uploadHandler}
              />
            </div>
          </div>
          <div className="w-[600px]">
            <FormInput name="Ціна" id="price" required />
          </div>
         <div className="w-[600px]">
           <FormInput name="Категорія" id="category" required />
         </div>
         <div className="w-[600px]">
           <FormInput name="Брент" id="brand" required />
         </div>
          <div className="w-[600px]">
            <FormInput name="Опис" id="description" required />
          </div>
          <div className="w-[600px]">
            <FormInput name="Кількість" id="countInStock" required />
          </div>
          <Button
            type="submit"
            disabled={isUpdating}
            className="mr-4"
          >
            {isUpdating && <span className="loading loading-spinner"></span>}
            Підтвердити
          </Button>
          <Button variant={'destructive'}>
            <Link href="/admin/products">
              Скасувати
            </Link>
          </Button>
        </form>
      </div>
    </div>
  )
}
