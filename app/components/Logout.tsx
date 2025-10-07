"use client";

import Button from "@/app/components/Buttons/Button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });

    router.push("/login");
  };

  return (
    <Button onClick={handleLogout} bgColor="red">
      Logout
    </Button>
  );
}
