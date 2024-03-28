import { prisma } from "@/src/lib/prisma";

const getCategories = async () => {
    return await prisma.category.findMany();
}

export const OrderSidebar = async () => {

    const categories = await getCategories();
    
    return (
        <aside className="md:w-72 md:h-screen bg-white">
            Ordersidebar
        </aside>
    )
}