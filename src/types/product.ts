import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "O nome é um campo obrigatório!" }),
  description: z
    .string()
    .min(1, { message: "A descrição do produto é um campo obrigatório!" }),
  price: z
    .number({
      invalid_type_error: "Preço inválido!",
      required_error: "O preço é um campo obrigatório!",
    })
    .min(1, { message: "O preço deve ser no mínimo 1,00." }),
  image: z
    .string()
    .url({ message: "URL Inválida" })
    .optional()
    .nullable()
    .or(z.literal(""))
    .transform((image) => {
      if (image === "") return null;
      return image;
    }),
  category: z
    .string()
    .min(1, { message: "É necessário especificar uma categoria!" }),
});

export type IProduct = z.infer<typeof productSchema>;
