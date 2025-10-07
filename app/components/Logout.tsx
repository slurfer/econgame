'use client";';
import Button from "@/app/components/Buttons/Button";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/login" })} bgColor="red">
      Logout
    </Button>
  );
}

export default LogoutButton;
