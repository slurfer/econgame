"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });

    router.push("/");
  };

  const style =
    "z-10 px-3 py-1 rounded text-red-600 underline hover:bg-black/50 transition";

  return (
    <>
      <button onClick={handleLogout} className={style}>
        Logout
      </button>
    </>
  );
}
