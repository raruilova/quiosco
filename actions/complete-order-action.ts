"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";

export const completeOrder = async (formData: FormData) => {
  const data = {
    orderId: formData.get("order_id"),
  };
  const result = OrderIdSchema.safeParse(data);

  if (result.success) {
    try {
      await prisma.order.update({
        where: {
          id: result.data.orderId,
        },
        data: {
          status: true,
          orderReadyAt: new Date(Date.now()),
        },
      });
      revalidatePath('/admin/order'); //hace una peticion solo de esa ruta al detectar cambios
    } catch (error) {
      console.log(error);
    }
  }
};
