import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (<>
        <Hero />
        <Navbar />
    <Component {...pageProps} />
    <Footer />
  </>);
}
