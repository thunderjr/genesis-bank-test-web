import { useEffect, useState } from "react";
import useSWR from "swr";

import type { FilterProductsReturnType } from "@/lib/mongodb/helpers";
import { ProductSearchBox } from "@/components/search-box";
import { ProductCard } from "@/components/product-card";
import { axiosFetcher } from "@/helpers/axios-fetcher";
import { Paginator } from "@/components/paginator";

type SearchParams = {
  page: number;
  limit: number;
  name?: string;
  category?: string;
};

const PRODUCTS_LIMIT = 5;

export default function ProductsPage() {
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    limit: PRODUCTS_LIMIT,
    page,
  });

  const [nameQuery, setNameQuery] = useState<string>();
  const [categoryQuery, setCategoryQuery] = useState<string>();

  const handleNameSearch = (name: string) => setNameQuery(name);

  const { data, isLoading } = useSWR<FilterProductsReturnType>(
    ["/api/product", searchParams],
    axiosFetcher
  );

  useEffect(() => {
    setSearchParams((oldState) => ({
      ...oldState,
      page,
      name: nameQuery,
      category: categoryQuery,
    }));
  }, [page, nameQuery, categoryQuery]);

  useEffect(() => {
    setPage(1);
  }, [nameQuery, categoryQuery]);

  return (
    <main className="mt-12 md:mt-32 flex justify-center">
      <section className="max-w-6xl md:w-5/6 md:p-8 rounded-lg md:bg-slate-700 md:backdrop-blur-md md:bg-opacity-40">
        {isLoading && <p>Carregando...</p>}

        <ProductSearchBox handleSearch={handleNameSearch} />

        <div className="mb-6">
          {data &&
            data.categories.map((category, i) => (
              <span
                key={`category-${i}`}
                onClick={() => setCategoryQuery(category)}
                className="inline-block cursor-pointer text-lg bg-white bg-opacity-50 rounded-full px-3 text-black mx-1"
              >
                {category}
              </span>
            ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {data &&
            data.items.map((product, i) => (
              <ProductCard key={`product-${i}`} product={product} />
            ))}
        </div>

        <Paginator
          total={data?.total!}
          setPage={setPage}
          itemsPerPage={PRODUCTS_LIMIT}
        />
      </section>
    </main>
  );
}
