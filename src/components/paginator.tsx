import type { Dispatch, SetStateAction } from "react";

type Props = {
  setPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  currentPage: number;
  total: number;
};

export const Paginator = ({
  currentPage,
  itemsPerPage,
  setPage,
  total,
}: Props) => {
  return (
    <div className="flex flex-col items-center">
      Página
      <div className="flex flex-wrap gap-2 text-lg">
        {Array(Math.ceil((total || itemsPerPage) / itemsPerPage))
          .fill(null)
          .map((_, i) => (
            <div
              className={`px-2 bg-white bg-opacity-70 transition-all hover:bg-opacity-100 text-black cursor-pointer ${
                currentPage === i + 1 ? "font-bold" : ""
              }`}
              onClick={() => setPage(i + 1)}
              key={i}
            >
              {i + 1}
            </div>
          ))}
      </div>
    </div>
  );
};
