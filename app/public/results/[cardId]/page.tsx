"use client";

import { useEffect, useState } from "react";
import PhoneLayout from "@/app/components/PhoneLayout";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import Button from "@/app/components/Buttons/Button";
import UserInfo from "@/app/components/UserInfo";

export default function CardPage() {
  const { cardId }: { cardId: string } = useParams();

  return (
    <PhoneLayout>
      <UserInfo cardId={cardId} />
    </PhoneLayout>
  );
}
