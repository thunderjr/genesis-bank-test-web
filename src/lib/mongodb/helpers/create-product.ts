import type { IProduct } from "@/types/product";
import { Product } from "@/lib/mongodb/models";

export const createProduct = async (data: IProduct) => {
  try {
    const product = new Product(data);
    await product.save();

    return product;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create the product");
  }
};
