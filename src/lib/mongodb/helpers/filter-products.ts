import type { FilterQuery } from "mongoose";

import type { PaginatedResult, PaginationOptions } from "@/types/pagination";
import type { IProduct } from "@/types/product";
import { Product } from "@/lib/mongodb/models";

export type FilterProductsReturnType = PaginatedResult<IProduct> & {
  categories: string[];
};

export const filterProducts = async (
  { category, name }: Partial<Pick<IProduct, "category" | "name">>,
  options: PaginationOptions
): Promise<FilterProductsReturnType> => {
  try {
    const { page, limit } = options;
    const skip = (page - 1) * limit;
    const query: FilterQuery<IProduct> = {};

    if (category) {
      query.category = category;
    }

    if (name) {
      // "i" for case insensitive
      query.name = { $regex: name, $options: "i" };
    }

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(limit);
    const categories = await Product.distinct("category");

    return {
      categories,
      items: products,
      total: totalProducts,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to filter products");
  }
};
