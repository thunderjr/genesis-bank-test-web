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
    <div className="flex gap-4 mb-10 [&>*]:rounded-md [&>*]:px-4 [&>*]:py-2 ">
      <input
        name="search"
        type="text"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleEnterOnInput}
        placeholder="Pesquisar pelo nome..."
        className="w-full"
      />
      <button onClick={() => handleSearch(name)} className="bg-violet-950">
        Pesquisar
      </button>
    </div>
  );
};
