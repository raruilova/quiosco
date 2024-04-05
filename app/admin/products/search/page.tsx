import { ProductSearchForm } from "@/components/products/ProductSearchForm";
import { ProductTable } from "@/components/products/ProductTable";
import { Heading } from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
const searchProducts = async (searchTerm: string) => {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive", //para que no importa si el usuario pone en miniscula o mayus lo va a encontrar
      },
    },
    include: {
      category: true,
    },
  });
  return products;
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { search: string };
}) => {
  const products = await searchProducts(searchParams.search);
  return (
    <>
      <Heading>Resultado de la busqueda: {searchParams.search}</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchForm />
      </div>
      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
};

export default SearchPage;
