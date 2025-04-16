"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

export default function Header() {
  const ThemeSelector = dynamic(() => import("./theme-selector"), {
    ssr: false,
  });
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/dashboard" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div className="flex-none space-x-2">
        <ThemeSelector />
      </div>
    </div>
  );
}
