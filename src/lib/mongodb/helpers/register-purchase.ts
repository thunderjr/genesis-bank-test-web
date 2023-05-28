import type { IPurchase } from "@/types/purchase";
import type { IProduct } from "@/types/product";
import { Product } from "../models";

type Params = {
  productId: string;
  amount: number;
};

export const registerPurchase = async ({
  productId,
  amount,
}: Params): Promise<IProduct | null> => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const purchase: IPurchase = {
      amount: amount,
      timestamp: new Date(),
    };

    product.purchases.push(purchase);
    await product.save();

    return product;
  } catch (error) {
    throw new Error("Failed to register purchase");
  }
};
