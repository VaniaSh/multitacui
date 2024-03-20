import { cache } from 'react'
import dbConnect from '@/lib/dbConnect'
import ProductModel, { Product } from '@/lib/models/ProductModel'

export const revalidate = 3600

const getLatest = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({}).sort({ _id: -1 }).limit(4).lean()
  return products as Product[]
})

const getFeatured = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({ isFeatured: true }).limit(3).lean()
  return products as Product[]
})

const getBySlug = cache(async (slug: string) => {
  await dbConnect()
  const product = await ProductModel.findOne({ slug }).lean()
  return product as Product
})

const getByCategory = cache(async (category: string) => {
  await dbConnect()
  const products = await ProductModel.find({category}).limit(4).lean()
  return products as Product[]
})

const getCategories = cache(async () => {
  await dbConnect()
  const categories = await ProductModel.find().distinct('category')
  return categories
})
const getAll = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({}).sort({ _id: -1 })
  return products as Product[]
})

const productService = {
  getLatest,
  getFeatured,
  getBySlug,
  getCategories,
  getByCategory,
  getAll
}
export default productService
