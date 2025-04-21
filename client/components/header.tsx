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
          <Link href="/" className="btn btn-ghost btn-md text-md">
            Home
          </Link>
          <Link
            href="/dashboard/report"
            className="btn btn-ghost btn-md text-md"
          >
            FIR
          </Link>
          <Link href="/dashboard/chat" className="btn btn-ghost btn-md text-md">
            Legal Assistance
          </Link>
          <Link
            href="/dashboard/video"
            className="btn btn-ghost btn-md text-md"
          >
            Crime Prediction
          </Link>
          <Link href="/dashboard/map" className="btn btn-ghost btn-md text-md">
            HeatMap
          </Link>
        </div>
      </div>

      <div className="flex-none">
        <ThemeSelector />
      </div>
    </div>
  );
}
