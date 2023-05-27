import "react-toastify/dist/ReactToastify.min.css";
import "@/styles/globals.css";

import { ToastContainer } from "react-toastify";
import { Inconsolata } from "next/font/google";
import type { AppProps } from "next/app";

import { NavBar } from "@/components/nav-bar";
import { CartProvider } from "@/context/cart-context";

const MainFont = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={MainFont.className}>
      <CartProvider>
        <NavBar />
        <Component {...pageProps} />
        <ToastContainer />
      </CartProvider>
    </div>
  );
}
