"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isActive =
    (href === "/" && path === "/") || (href !== "/" && path.startsWith(href));

  return (
    <Link
      href={href}
      className={`block rounded-lg px-4 py-2 font-medium transition-colors ${
        isActive
          ? "bg-blue-500 text-white"
          : " text-white hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {children}
    </Link>
  );
}
