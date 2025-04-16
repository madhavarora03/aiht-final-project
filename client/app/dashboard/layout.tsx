import Header from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="bg-base-200 h-[calc(100dvh-4rem)]">{children}</main>
    </>
  );
}
