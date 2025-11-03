import Link from 'next/link'
import Image from "next/image";
import { ShoppingCart, Menu, Search } from "lucide-react";
import SignInMenu from "./SignInMenue";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 shadow-sm border-b">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={40}
          priority
        />
      </div>

      {/* Middle section */}
      <div className="flex items-center gap-6 text-sm font-medium">

      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer" />
        <Link
        href="/new-order"
        className="hover:text-blue-600 transition-colors duration-200"
      >
        Order now
      </Link>

      <Link
        href="/my-file"
        className="hover:text-blue-600 transition-colors duration-200"
      >
        My file
      </Link>
        <SignInMenu />
        <div className="relative">
          <ShoppingCart className="w-6 h-6 cursor-pointer" />
          <span className="absolute -top-2 -right-2 text-xs bg-pink-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span>
        </div>
      </div>
    </header>
  );
}
