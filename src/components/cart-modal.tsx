import { useEffect, useState } from "react";

import { currencyFormat } from "@/helpers/currency-format";
import { useCart } from "@/context/cart-context";

type Props = {
  shown: boolean;
};

export const CartModal = ({ shown }: Props) => {
  const [total, setTotal] = useState<number>(0);
  const { cartItems, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    const cartItemsSum = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
    setTotal(cartItemsSum);
  }, [cartItems]);

  return (
    <div
      className={`absolute z-50 shadow-lg top-16 right-0 w-72 ${
        !shown ? "hidden" : ""
      }`}
    >
      <div className="bubble-arrow ml-auto mr-4" />
      <div className="flex flex-col bg-violet-950 backdrop-blur-3xl p-4">
        {cartItems.length ? (
          <>
            {cartItems.map((item, index) => (
              <div key={`cart-${index}`} className="flex flex-col">
                <div className="flex mx-2">
                  <span className="">
                    {currencyFormat(item.product.price * item.quantity)}
                  </span>
                  <span className="flex last:ml-auto group">
                    <div className="group-hover:hidden">
                      {item.quantity} x{" "}
                      <span className="font-bold text-lg">
                        {item.product.name}
                      </span>
                    </div>
                    <div
                      onClick={() => removeFromCart(item.product)}
                      className="cursor-pointer hidden group-hover:block"
                    >
                      <span className="font-bold text-lg underline">
                        REMOVER
                      </span>
                    </div>
                  </span>
                </div>
              </div>
            ))}

            <div className="flex my-4 border-t border-white px-4">
              <span>{currencyFormat(total)}</span>
              <h3 className="ml-auto font-bold">Total</h3>
            </div>

            <div
              onClick={clearCart}
              className="text-right cursor-pointer hover:underline"
            >
              Limpar carrinho
            </div>
          </>
        ) : (
          <span className="text-center">Nenhum item no carrinho.</span>
        )}
      </div>
    </div>
  );
};
