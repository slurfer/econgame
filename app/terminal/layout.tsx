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

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(undefined, { callbackUrl: "/" });
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <CardProvider>
        <ShopDataProvider>{children}</ShopDataProvider>
      </CardProvider>
    );
  }
  return null;
}
