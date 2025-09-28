"use client";

import Button from "@/app/components/Buttons/Button";
import PhoneLayout from "@/app/components/PhoneLayout";
import { useCard } from "@/context/CardModalContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

export default function CardInfoPage() {
  const { setCardData, setModalState, cardData } = useCard();
  const router = useRouter();

  function handleRead() {
    setCardData(null);
    setModalState("reading");
  }

  useEffect(() => {
    if (!cardData) return;
    router.push(`/terminal/cardInfo/${cardData}`);
    setCardData(null);
  }, [cardData]);

  return (
    <PhoneLayout>
      <Header blueText="Get Card Info" backButtonLink="/terminal" />
      <div className="w-full flex items-center justify-center">
        <Button bgColor="green" onClick={handleRead}>
          Read
        </Button>
      </div>
    </PhoneLayout>
  );
}
