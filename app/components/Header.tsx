"use client";

import BackButton from "./Buttons/BackButton";
import LogoutButton from "./Buttons/LogoutButton"; // your logout button component
import { useSession } from "next-auth/react";

interface HeaderProps {
  blackText?: string;
  blueText?: string;
  showBackButton?: boolean;
  backButtonLink?: string;
  showUserInfo?: boolean;
}

export default function Header({
  blackText,
  blueText,
  showBackButton = true,
  backButtonLink,
  showUserInfo = true,
}: HeaderProps) {
  const { data: session, status } = useSession();

  return (
    <div className="relative flex flex-col items-center p-4 pb-0">
      <h1 className="text-4xl font-bold text-center">
        {blackText ? `${blackText} ` : null}
        <span className="text-blue-600">{blueText ? `${blueText}` : null}</span>
      </h1>
      <div className="w-full flex justify-between items-center mb-4">
        {showBackButton ? <BackButton link={backButtonLink} /> : <div />}

        {showUserInfo && status === "authenticated" ? (
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-700">
              {session.user?.name}
            </span>
            <LogoutButton />
          </div>
        ) : null}
      </div>
    </div>
  );
}
