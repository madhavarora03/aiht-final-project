"use client";
import { Paintbrush } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSelector() {
  const THEMES = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
    "caramellatte",
    "abyss",
    "silk",
  ] as const;

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        <Paintbrush />
        <span className="hidden md:inline">Appearance</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm max-h-96 overflow-scroll grid grid-cols-1"
      >
        {THEMES.map((t) => (
          <li key={t}>
            <ThemeSelectorItem t={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThemeSelectorItem({ t }: { t: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <a
      key={t}
      className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
      onClick={() => setTheme(t)}
    >
      <div
        className="relative h-8 w-full rounded-md overflow-hidden"
        data-theme={t}
      >
        <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
          <div className="rounded bg-primary"></div>
          <div className="rounded bg-secondary"></div>
          <div className="rounded bg-accent"></div>
          <div className="rounded bg-neutral"></div>
        </div>
      </div>
      <span className="text-[11px] font-medium truncate w-full text-center capitalize">
        {t}
      </span>
    </a>
  );
}
