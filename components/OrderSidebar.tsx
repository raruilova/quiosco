import { PrismaClient } from "@prisma/client"


const prismaClient = new PrismaClient();

const getCategories = async () => {
    return await prismaClient.category.findMany();
}

export const OrderSidebar = () => {
    
    return (
        <aside className="md:w-72 md:h-screen bg-white">
            Ordersidebar
        </aside>
    )
}