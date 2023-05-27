import { type KeyboardEvent, useState } from "react";

type Props = {
  handleSearch: (name: string) => void;
};

export const ProductSearchBox = ({ handleSearch }: Props) => {
  const [name, setName] = useState<string>("");

  const handleEnterOnInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(name);
    }
  };

  return (
    <div className="flex gap-4 mb-10 px-4 md:px-0 [&>*]:px-4 [&>*]:py-2 ">
      <input
        type="text"
        name="search"
        className="w-full"
        onKeyDown={handleEnterOnInput}
        placeholder="Pesquisar pelo nome..."
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => handleSearch(name)} className="bg-violet-950">
        Pesquisar
      </button>
    </div>
  );
};
