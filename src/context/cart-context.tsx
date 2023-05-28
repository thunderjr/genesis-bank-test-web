import { createContext, useContext, useState } from "react";

import type { IProduct } from "@/types/product";

export type CartItem = {
  product: IProduct;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (product: IProduct) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: IProduct, quantity: number) => {
    const existingItem = cartItems.find(
      (item) => item.product._id === product._id
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > 0) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product === product ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        removeFromCart(product);
      }
    } else if (quantity > 0) {
      setCartItems((prevItems) => [...prevItems, { product, quantity }]);
    }
  };

  const removeFromCart = (product: IProduct) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product._id !== product._id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
