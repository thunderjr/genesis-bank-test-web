import { PT_Sans_Caption } from "next/font/google";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { CartModal } from "@/components/cart-modal";
import { useCart } from "@/context/cart-context";
import cartSvg from "../../public/cart.svg";

const LogoFont = PT_Sans_Caption({
  subsets: ["latin"],
  weight: "700",
});

export const NavBar = () => {
  const [cartActive, setCartActive] = useState<boolean>(false);
  const { cartItems } = useCart();

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

  const toggleCart = () => setCartActive((oldState) => !oldState);

  return (
    <nav className="md:fixed md:top-0 md:left-0 md:right-0 z-50 bg-black bg-opacity-20 backdrop-blur-3xl md:h-[68px] p-6 md:p-8 flex flex-wrap flex-col md:flex-row md:flex-nowrap items-center">
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

      <div className="grid place-items-center relative ml-auto">
        <div onClick={toggleCart} className="cursor-pointer">
          <Image className="invert" width={40} src={cartSvg} alt="Carrinho" />
          <div className="bg-red-500 px-1 grid place-items-center rounded-full text-xs absolute right-3 bottom-4">
            {cartItems.length}
          </div>
          <p className="text-xs">Carrinho</p>
        </div>
        <CartModal shown={cartActive} />
      </div>
    </nav>
  );
};
