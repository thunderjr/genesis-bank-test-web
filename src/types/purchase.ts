import { z } from "zod";

export const purchaseSchema = z.object({
  amount: z.number(),
  timestamp: z.date(),
});

export const purchaseRequestSchema = z.array(
  z.object({
    productId: z.string(),
    amount: z.number(),
  })
);

export type IPurchase = z.infer<typeof purchaseSchema>;
