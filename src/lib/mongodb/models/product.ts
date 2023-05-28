import mongoose, { type Types, type Model } from "mongoose";

import type { IPurchase } from "@/types/purchase";
import type { IProduct } from "@/types/product";
import { purchaseModel } from "./purchase";

type ProductModel = Omit<IProduct, "purchases"> & {
  purchases: Types.DocumentArray<IPurchase>;
};

const productModel = new mongoose.Schema<ProductModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String, required: true },
    purchases: [purchaseModel],
  },
  { timestamps: true }
);

export const Product: Model<ProductModel> =
  mongoose.models.Product ||
  mongoose.model<ProductModel>("Product", productModel);
