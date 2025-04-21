"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

export default function Header() {
  const ThemeSelector = dynamic(() => import("./theme-selector"), {
    ssr: false,
  });

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <Link href="/dashboard" className="btn btn-ghost text-xl font-bold">
          daisyUI
        </Link>

        <div className="ml-6 flex gap-4">
          <Link href="/" className="btn btn-ghost btn-sm">
            Home
          </Link>
          <Link href="/dashboard/report" className="btn btn-ghost btn-sm">
            FIR
          </Link>
          <Link href="/dashboard/chat" className="btn btn-ghost btn-sm">
            Legal Assistance
          </Link>
          <Link href="/dashboard/video" className="btn btn-ghost btn-sm">
            Crime Prediction
          </Link>
        </div>
      </div>

      <div className="flex-none">
        <ThemeSelector />
      </div>
    </div>
  );
}
