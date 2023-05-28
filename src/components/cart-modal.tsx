import { useEffect, useState } from "react";

import { currencyFormat } from "@/helpers/currency-format";
import { useCart } from "@/context/cart-context";

type Props = {
  shown: boolean;
};

export const CartModal = ({ shown }: Props) => {
  const [total, setTotal] = useState<number>(0);
  const { cartItems, removeFromCart, clearCart, submitCart } = useCart();

  useEffect(() => {
    const cartItemsSum = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
    setTotal(cartItemsSum);
  }, [cartItems]);

  return (
    <div
      className={`absolute z-50 shadow-lg top-16 right-0 w-96 ${
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

            <div className="flex mt-4 mb-6 border-t border-white px-4">
              <span>{currencyFormat(total)}</span>
              <h3 className="ml-auto font-bold">Total</h3>
            </div>

            <div
              onClick={clearCart}
              className="flex flex-row justify-between cursor-pointer"
            >
              <span className="hover:underline">Limpar carrinho</span>
              <button className="hover:underline" onClick={submitCart}>
                Finalizar Compra
              </button>
            </div>
          </>
        ) : (
          <span className="text-center">Nenhum item no carrinho.</span>
        )}
      </div>
    </div>
  );
};
