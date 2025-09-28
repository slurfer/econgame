"use client";

import PhoneLayout from "@/app/components/PhoneLayout";
import { useParams } from "next/navigation";
import UserInfo from "@/app/components/UserInfo";

export default function CardPage() {
  const { cardId }: { cardId: string } = useParams();

  return (
    <PhoneLayout>
      <UserInfo cardId={cardId} />
    </PhoneLayout>
  );
}
