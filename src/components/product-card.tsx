import type { IProduct } from "@/types/product";
import Image from "next/image";

import productIcon from "../../public/product-icon.svg";

export const ProductCard = ({ product }: { product: IProduct }) => {
  const currencyFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format;

  const hasImage = !!product.image?.length;

  return (
    <div className="max-w-xs overflow-hidden shadow-lg bg-white bg-opacity-60 backdrop-blur-3xl pb-6">
      <Image
        priority
        className={`w-full h-36 ${
          !hasImage ? "bg-white py-12 opacity-40" : ""
        }`}
        width={hasImage ? 500 : undefined}
        height={hasImage ? 500 : undefined}
        src={product.image || productIcon}
        alt={product.name}
      />
      <div className="px-6 py-4">
        <div className="text-black font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>

      <div className="px-6 text-sm font-semibold [&>*]:cursor-pointer">
        <span className="inline-block bg-gray-200 rounded-full px-3 text-gray-700 mr-2 mb-2">
          {product.category}
        </span>
        <span className="inline-block bg-green-200 rounded-full px-3 text-green-700">
          {currencyFormat(product.price)}
        </span>
      </div>
    </div>
  );
};
