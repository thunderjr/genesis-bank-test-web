import { createContext, useContext, useState } from "react";

import type { IProduct } from "@/types/product";
import axios from "axios";

export type CartItem = {
  product: IProduct;
  quantity: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (product: IProduct) => void;
  clearCart: () => void;
  submitCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  submitCart: async () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: IProduct, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product._id === product._id
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;

      if (updatedCartItems[existingItemIndex].quantity <= 0) {
        updatedCartItems.splice(existingItemIndex, 1);
      }

      setCartItems(updatedCartItems);
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

  const submitCart = async () => {
    try {
      const cartData = cartItems.map((item) => ({
        productId: item.product._id,
        amount: item.quantity,
      }));

      await axios.post("/api/purchase", cartData);

      clearCart();
    } catch (error) {
      console.error("Error submitting cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, submitCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
