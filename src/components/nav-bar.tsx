import { PT_Sans_Caption } from "next/font/google";
import Link from "next/link";

const LogoFont = PT_Sans_Caption({
  subsets: ["latin"],
  weight: "700",
});

export const NavBar = () => {
  return (
    <nav className="md:h-16 p-4 md:p-8 mb-4 flex flex-wrap flex-col md:flex-row md:flex-nowrap items-center dark:border-b dark:border-b-slate-500">
      <p
        className={`${LogoFont.className} text-3xl md:mr-28 mb-4 md:mb-0 cursor-pointer`}
      >
        Genesis Bank Test
      </p>

      <ul className="font-bold flex flex-wrap gap-5 md:flex-nowrap mb-6 md:mb-0 ">
        <li>
          <Link href="/products/">Produtos</Link>
        </li>
        <li>
          <Link href="/products/new">Novo Produto</Link>
        </li>
      </ul>

      <div className="md:ml-auto">
        <p>by Flavio Marques</p>
      </div>
    </nav>
  );
};
