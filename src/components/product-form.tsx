import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

import { type IProduct, productSchema } from "@/types/product";

export const ProductForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IProduct>({
    defaultValues: {
      category: "Default",
    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    const response = await axios.post("/api/product", data);

    if (response.status === 201) {
      toast.success("Produto criado com sucesso!", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        draggable: true,
      });

      router.push("/products");
    }
  };

  return (
    <form
      className="max-w-lg flex flex-col gap-3 [&>div]:flex [&>div:not(.single-row)]:flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="name">Nome do Produto</label>
        <input id="name" type="text" {...register("name")} />
        {errors.name && <p className="input-error">{errors.name?.message}</p>}
      </div>

      <div>
        <label htmlFor="description">Descrição</label>
        <input id="description" type="text" {...register("description")} />
        {errors.description && (
          <p className="input-error">{errors.description?.message}</p>
        )}
      </div>

      <div className="single-row gap-3 [&>div]:flex [&>div]:flex-1 [&>div]:flex-col">
        <div>
          <label htmlFor="category">Categoria</label>
          <input id="category" type="text" {...register("category")} />
          {errors.category && (
            <p className="input-error">{errors.category?.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="price">Preço</label>
          <input
            id="price"
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="input-error">{errors.price?.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="image">URL da Imagem</label>
        <input
          id="image"
          type="text"
          {...register("image", { required: false })}
        />
        {errors.image && <p className="input-error">{errors.image?.message}</p>}
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="p-3 bg-white text-black disabled:bg-gray-300"
          disabled={isSubmitting}
        >
          Salvar
        </button>
      </div>
    </form>
  );
};
