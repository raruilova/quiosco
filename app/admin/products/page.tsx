import { ProductTable } from "@/components/products/ProductTable";
import { ProductsPagination } from "@/components/products/ProductsPagination";
import { Heading } from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

const productCount = async () => {
  return await prisma.product.count();
};

const getProducts = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
  return products;
};

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  //searchparams para el paginador desde la url ?page=1, obtengo el 1
  const page = +searchParams.page || 1;
  const pageSize = 10;
  if (page < 0) {
    redirect("/admin/products");
  }
  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);
  if (page > totalPages) {
    redirect("/admin/products");
  }
  return (
    <>
      <Heading>Admministrar Productos</Heading>
      <ProductTable products={products} />
      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  );
};

export default ProductsPage;
