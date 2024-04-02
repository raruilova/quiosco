import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaaseQuantity: (id:Product['id']) => void
    decreaseQuantity: (id:Product['id']) => void
    removeItem: (id:Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        const {categoryId, image, ...data} = product;
        let order:OrderItem[] = [];
        if(get().order.find(item => item.id === data.id)) {
            order = get().order.map(item => item.id === data.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            }: item);
        } else {
           order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        //...data con los datos que quiero añadir, los demas los separo
        set(() => ({
            order
        }))
    },
    increaaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            }: item)
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        }: item);
        set(() => ({
            order
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    },
}));