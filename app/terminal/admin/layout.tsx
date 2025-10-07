"use client";
import { CardProvider } from "@/context/CardModalContext";
import { ShopDataProvider } from "@/context/ShopDataContext";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Not logged in</p>;
  if (session?.user?.role !== "admin") {
    return <p>Access Denied</p>;
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }
  return null;
}
