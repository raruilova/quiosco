"use client";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type CategoryIconsProps = {
  category: Category;
};

export const CategoryIcon = ({ category }: CategoryIconsProps) => {
  const params = useParams<{ category: string }>();
  console.log(params, category);
  
  return (
    <div
      className={`${
        category.slug === params.category ? "bg-amber-400" : ""
      } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      <div className="w-16 h-16 relative">
        <Image fill src={`/icon_${category.slug}.svg`} alt="iamgen categoria" />
      </div>
      <Link href={`/order/${category.slug}`} className="text-xl font-bold">
        {category.name}
      </Link>
    </div>
  );
};
