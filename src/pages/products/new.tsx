import { ProductForm } from "@/components/product-form";

export default function NewProductPage() {
  return (
    <main className="h-full md:-mt-16 flex items-center justify-center">
      <section className="content p-12 px-24 bg-slate-700 backdrop-blur-md bg-opacity-40">
        <ProductForm />
      </section>
    </main>
  );
}
