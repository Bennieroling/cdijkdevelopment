import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (<>
  <head> <title>C Dijk Dev</title></head>
        <Hero />
        <Navbar />
    <Component {...pageProps} />
    <Footer />
  </>);
}
