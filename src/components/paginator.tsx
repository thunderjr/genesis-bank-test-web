import type { Dispatch, SetStateAction } from "react";

type Props = {
  setPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  total: number;
};

export const Paginator = ({ itemsPerPage, setPage, total }: Props) => {
  return (
    <div className="flex flex-col items-center">
      Página
      <div className="flex flex-wrap gap-2 text-lg">
        {Array(Math.ceil((total || itemsPerPage) / itemsPerPage))
          .fill(null)
          .map((_, i) => (
            <div
              className="px-3 rounded-lg bg-white bg-opacity-70 transition-all hover:bg-opacity-100 text-black cursor-pointer"
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
