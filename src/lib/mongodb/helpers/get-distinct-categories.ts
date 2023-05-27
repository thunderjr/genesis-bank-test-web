import { Product } from "@/lib/mongodb/models";

export const getDistinctCategories = async (): Promise<string[]> => {
  try {
    const categories = await Product.distinct("category");
    return categories;
  } catch (error) {
    throw new Error("Failed to fetch distinct categories");
  }
};
