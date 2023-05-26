import type { IProduct } from "@/types/product";
import { Product } from "@/lib/mongodb/models";

export const createProduct = async (data: IProduct) => {
  const product = new Product(data);
  await product.save();

  return product;
};
