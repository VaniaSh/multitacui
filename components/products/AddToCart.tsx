'use client'
import useCartService from '@/lib/hooks/useCartStore'
import {OrderItem} from '@/lib/models/OrderModel'
import {Button} from "@/components/ui/button";
import { toast } from "sonner"

export default function AddToCart({item}: { item: OrderItem }) {
    const {increase} = useCartService()

    const addToCartHandler = () => {
        increase(item)
        toast.success('Успішно додано до корзини')
    }
    return <Button
        variant={'default'}
        type="button"
        onClick={addToCartHandler}
    >
        Додати до корзини
    </Button>
}
