import { useEffect, useState } from "react";
import useSWR from "swr";

import type { FilterProductsReturnType } from "@/lib/mongodb/helpers";
import { ProductSearchBox } from "@/components/search-box";
import { ProductCard } from "@/components/product-card";
import { axiosFetcher } from "@/helpers/axios-fetcher";
import { Paginator } from "@/components/paginator";
import { CategoryFilterButtons } from "@/components/category-filter-buttons";

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
    <main className="mt-12 md:mt-48 flex justify-center">
      <section className="flex flex-col max-w-6xl md:w-5/6 px-8 md:p-8 md:bg-slate-700 md:backdrop-blur-md md:bg-opacity-40">
        {isLoading && <p>Carregando...</p>}

        <ProductSearchBox handleSearch={handleNameSearch} />

        {data && (
          <CategoryFilterButtons
            categories={data?.categories!}
            handleSearch={setCategoryQuery}
          />
        )}

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {data &&
            data.items.map((product, i) => (
              <ProductCard key={`product-${i}`} product={product} />
            ))}
        </div>

        {data && data.items && (
          <Paginator
            itemsPerPage={PRODUCTS_LIMIT}
            total={data?.total!}
            currentPage={page}
            setPage={setPage}
          />
        )}
      </section>
    </main>
  );
}
