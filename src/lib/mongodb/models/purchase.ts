import { Schema } from "mongoose";

import type { IPurchase } from "../../../types/purchase";

export const purchaseModel = new Schema<IPurchase>(
  {
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);
