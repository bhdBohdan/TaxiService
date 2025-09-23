"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-sky-900 text-white p-4 transition-transform duration-300 z-30
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <nav className="mt-20 ml-5 space-y-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/passengers">Passengers</NavLink>
          <NavLink href="/drivers">Drivers</NavLink>
          <NavLink href="/trips">Trips</NavLink>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 md:ml-64">
        {/* Toggle button for mobile */}
        <button
          className="md:hidden p-3 m-2 rounded-md bg-gray-500 text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
