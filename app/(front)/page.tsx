import ProductItem from '@/components/products/ProductItem'
import productService from '@/lib/services/productService'
import { convertDocToObj } from '@/lib/utils'
import { Metadata } from 'next'
import Image from 'next/image'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import HeroSection from "@/components/HeroSection";
import FeaturesCards from "@/components/FeaturesCards";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Multi-tac',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Nextjs, Server components, Next auth, daisyui, zustand',
}

export default async function Home() {
  const latestProducts = await productService.getLatest()
  return (
    <div className="flex flex-col">
        <HeroSection/>
      <h2 className="text-3xl pt-8 pb-4 px-24">Наші новинки</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 md:px-24">
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObj(product)} />
        ))}
      </div>
    </div>
  )
}
