"use client";
import { useStore } from "@/src/store";
import { ProductDetails } from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderShema } from "@/src/schema";
import { toast } from "react-toastify";

export const OrderSummary = () => {
  const order = useStore((state) => state.order);
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order
    };

    const result = OrderShema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
    }
  };
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-bold">Mi pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El carrito esta vacío</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
        </div>
      )}
      <p className="text-2xl mt-20 text-center">
        Total a pagar: {""}
        <span className="font-bold">{formatCurrency(total)}</span>
      </p>
      <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
        <input
          type="text"
          placeholder="Tu nombre"
          name="name"
          id=""
          className="bg-white border border-gray-100 p-2 w-full"
        />
        <input
          type="submit"
          name=""
          id=""
          className="py-2 rounded-sm uppercase font-bold text-white bg-black w-full text-center cursor-pointer"
          value="Confirmar Pedido"
        />
      </form>
    </aside>
  );
};
