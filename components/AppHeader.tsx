import Link from "next/link";
import Image from "next/image";
import myPng from "@/public/taxi.png";

export default function AppHeader() {
  return (
    <header className="relative z-50">
      {/* Logo / image on the left */}
      <Link
        href="/"
        className="w-full bg-blue-300 h-16 flex items-center px-6 shadow-md"
      >
        <Image
          src={myPng}
          alt="Logo"
          className="h-10 w-10 object-contain mr-4"
          width={180}
          height={38}
        />
        <h1 className="text-white text-xl font-semibold">TaxiService App</h1>
      </Link>
    </header>
  );
}
