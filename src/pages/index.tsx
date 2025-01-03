import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import WhoAmI from "@/components/who-am-i";
import Slots from "@/components/slots";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (<>
    <WhoAmI />
      <Slots />
  </>
  );
}
