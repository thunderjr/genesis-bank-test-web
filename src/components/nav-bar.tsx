import { PT_Sans_Caption } from "next/font/google";
import Link from "next/link";

const LogoFont = PT_Sans_Caption({
  subsets: ["latin"],
  weight: "700",
});

export const NavBar = () => {
  return (
    <nav className="h-16 p-8 mb-4 flex flex-wrap md:flex-nowrap items-center dark:border-b dark:border-b-slate-500">
      <p
        className={`${LogoFont.className} text-3xl md:mr-28 mb-4 md:mb-0 cursor-pointer`}
      >
        Genesis Bank Test
      </p>

      <ul className="flex flex-wrap gap-5 md:flex-nowrap font-bold">
        <li>
          <Link href="/products/">Produtos</Link>
        </li>
        <li>
          <Link href="/products/new">Novo Produto</Link>
        </li>
      </ul>

      <div className="ml-auto">
        <p>by Flavio Marques</p>
      </div>
    </nav>
  );
};
