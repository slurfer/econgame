"use client";

import PhoneLayout from "@/app/components/PhoneLayout";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import Button from "@/app/components/Buttons/Button";
import UserInfo from "@/app/components/UserInfo";
import { useCard } from "@/context/CardModalContext";
import { QRCodeCanvas } from "qrcode.react";
import { useSession } from "next-auth/react";

export default function CardPage() {
  const { cardId }: { cardId: string } = useParams();
  const { setCardData, setModalState } = useCard();
  const { data: session } = useSession();

  function handleReinit() {
    setCardData(cardId);
    setModalState("writing");
  }

  return (
    <PhoneLayout>
      <Header blueText="Card Info" backButtonLink="/terminal" />
      <div className="flex justify-center items-center">
        <QRCodeCanvas
          value={`${process.env.NEXT_PUBLIC_URL}/public/results/${cardId}`}
          size={200}
        />
      </div>
      {session?.user?.role === "admin" && (
        <>
          <div className="h-6"></div>
          <Button bgColor="green" onClick={handleReinit}>
            ReinitCard
          </Button>
        </>
      )}
      <div className="h-6"></div>
      <UserInfo cardId={cardId} />
    </PhoneLayout>
  );
}
