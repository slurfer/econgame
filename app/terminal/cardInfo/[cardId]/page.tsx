"use client";

import PhoneLayout from "@/app/components/PhoneLayout";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import Button from "@/app/components/Buttons/Button";
import UserInfo from "@/app/components/UserInfo";
import { useCard } from "@/context/CardModalContext";
import { QRCodeCanvas } from "qrcode.react";

export default function CardPage() {
  const { cardId }: { cardId: string } = useParams();
  const { setCardData, setModalState } = useCard();

  function handleReinit() {
    setCardData(cardId);
    setModalState("writing");
  }

  return (
    <PhoneLayout>
      <Header blueText="Card Info" backButtonLink="/terminal" />
      <UserInfo cardId={cardId} />
      <div className="h-6"></div>
      <div className="flex justify-center items-center">
        <QRCodeCanvas
          value={`${process.env.NEXT_PUBLIC_URL}/public/results/${cardId}`}
          size={200}
        />
      </div>
      <div className="h-6"></div>
      <Button bgColor="green" onClick={handleReinit}>
        ReinitCard
      </Button>
    </PhoneLayout>
  );
}
