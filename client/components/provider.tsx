"use client";

import { NotificationProvider } from "./notification";
import { ThemeProvider } from "./use-theme";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider disableTransitionOnChange>
      <NotificationProvider>{children}</NotificationProvider>
    </ThemeProvider>
  );
}
