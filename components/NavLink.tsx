"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import classes from "@/components/main-header/nav-link.module.css";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        (href === "/" && path === "/") ||
        (href !== "/" && path.startsWith(href))
          ? "block hover:text-gray-400 font-bold text-stone-900"
          : "block hover:text-gray-400 font-bold"
      }
    >
      {children}
    </Link>
  );
}
