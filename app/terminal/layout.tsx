"use client";
import { CardProvider } from "@/context/CardModalContext";
import { ShopDataProvider } from "@/context/ShopDataContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShopDataProvider>
      <CardProvider>{children}</CardProvider>
    </ShopDataProvider>
  );
}
