import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().optional(),
  category: z.string(),
});

export type IProduct = z.infer<typeof productSchema>;
