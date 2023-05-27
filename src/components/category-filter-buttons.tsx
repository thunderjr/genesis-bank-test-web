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
    <div className="self-center mb-6">
      {categories.map((category, i) => (
        <span
          key={`category-${i}`}
          onClick={() => handleSearch(category)}
          className="inline-block cursor-pointer text-lg font-bold bg-white bg-opacity-50 rounded-full px-4 text-black mx-1"
        >
          {category}
        </span>
      ))}
    </div>
  );
};
