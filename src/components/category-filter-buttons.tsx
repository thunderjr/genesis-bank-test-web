import type { Dispatch, SetStateAction } from "react";

type Props = {
  handleSearch: Dispatch<SetStateAction<string | undefined>>;
  categories: string[];
};

export const CategoryFilterButtons = ({
  categories = [],
  handleSearch,
}: Props) => {
  return (
    <div className="self-center md:self-start mb-6">
      <h4>Filtrar:</h4>
      {categories.map((category, i) => (
        <span
          key={`category-${i}`}
          onClick={() => handleSearch(category)}
          className="inline-block cursor-pointer text-lg font-bold bg-white bg-opacity-50 px-4 text-black mx-1"
        >
          {category}
        </span>
      ))}
    </div>
  );
};
