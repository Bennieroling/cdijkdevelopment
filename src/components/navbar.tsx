import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 flex items-center justify-between bg-secondary p-4">
      <div className="glass-sm p-2 px-4 text-center text-white">
        <Link href="/" className="text-lg font-bold">
          C~<span className="color-effect font-black">Dijk</span>
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href="/advies" className={router.pathname === "/advies" ? "text-white" : ""}>
          Advies
        </Link>
        <Link href="/hr" className={router.pathname === "/hr" ? "text-white" : ""}>
          HR
        </Link>
        <Link href="/toezicht" className={router.pathname === "/toezicht" ? "text-white" : ""}>
          Toezicht
        </Link>
        {/* Uncomment if needed in the future
        <Link href="/coaching" className={router.pathname === "/coaching" ? "text-white" : ""}>
          Coaching
        </Link>
        */}
        <Link href="/contact" className={router.pathname === "/contact" ? "text-white" : ""}>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;