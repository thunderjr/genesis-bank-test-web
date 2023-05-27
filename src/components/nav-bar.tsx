import { PT_Sans_Caption } from "next/font/google";
import Link from "next/link";

const LogoFont = PT_Sans_Caption({
  subsets: ["latin"],
  weight: "700",
});

export const NavBar = () => {
  const navItems = [
    {
      name: "Produtos",
      href: "/products",
    },
    {
      name: "Novo Produto",
      href: "/products/new",
    },
  ];

  return (
    <nav className="md:fixed md:top-0 md:left-0 md:right-0 z-50 bg-black bg-opacity-10 backdrop-blur-3xl md:h-16 p-6 md:p-8 flex flex-wrap flex-col md:flex-row md:flex-nowrap items-center">
      <p
        className={`${LogoFont.className} text-2xl md:mr-28 mb-4 md:mb-0 cursor-pointer`}
      >
        Genesis Bank Test
      </p>

      <ul className="text-lg font-bold flex flex-wrap md:gap-5 flex-col items-center md:items-start md:flex-row md:flex-nowrap">
        {navItems.map(({ name, href }, i) => (
          <li key={`nav-${i}`}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:block md:ml-auto">
        <p>by Flavio Marques</p>
      </div>
    </nav>
  );
};
