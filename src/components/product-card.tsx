import type { IProduct } from "@/types/product";
import { useEffect, useState } from "react";
import Image from "next/image";

import productIcon from "../../public/product-icon.svg";
import cartSvg from "../../public/cart.svg";

import { currencyFormat } from "@/helpers/currency-format";
import { CartItem, useCart } from "@/context/cart-context";

type Props = {
  product: IProduct;
};

export const ProductCard = ({ product }: Props) => {
  const [productFromCart, setProductFromCart] = useState<CartItem>();
  const { cartItems, addToCart } = useCart();
  const hasImage = !!product.image?.length;

  useEffect(() => {
    setProductFromCart(
      cartItems.find(
        (cartItem: any) => cartItem.product._id === (product as any)._id
      )
    );
  }, [cartItems, product]);

  return (
    <div className="max-w-xs overflow-hidden shadow-lg bg-black bg-opacity-60 backdrop-blur-3xl">
      <Image
        priority
        className={`w-full h-36 ${
          !hasImage ? "bg-violet-900 py-12 opacity-30" : ""
        }`}
        width={hasImage ? 500 : undefined}
        height={hasImage ? 500 : undefined}
        src={product.image || productIcon}
        alt={product.name}
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl">{product.name}</div>
        <p className="opacity-50 text-base">{product.description}</p>
      </div>

      <div className="px-6 text-sm font-semibold [&>*]:cursor-pointer">
        <span className="inline-block bg-gray-200 px-3 text-gray-700 mr-2 mb-2">
          {product.category}
        </span>
        <span className="inline-block bg-green-200 px-3 text-green-700">
          {currencyFormat(product.price)}
        </span>
      </div>

      {productFromCart && (
        <div className="flex mt-4 mb-6 px-6 gap-1 justify-end items-center">
          <button
            onClick={() => addToCart(product, -1)}
            className="bg-violet-700 h-8 px-3 text-xl"
          >
            -
          </button>
          <input
            className="bg-white w-8 h-8 text-center"
            value={productFromCart.quantity}
            disabled
          />
          <button
            onClick={() => addToCart(product, 1)}
            className="bg-violet-700 h-8 px-3 text-xl"
          >
            +
          </button>
        </div>
      )}

      {!productFromCart && (
        <button
          type="button"
          title="Adicionar ao carrinho"
          onClick={() => addToCart(product, 1)}
          className="m-4 ml-auto grid place-items-center bg-violet-700 w-10 h-10 p-2 rounded-full cursor-pointer"
        >
          <Image className="invert" src={cartSvg} alt="Adicionar ao carrinho" />
        </button>
      )}
    </div>
  );
};
