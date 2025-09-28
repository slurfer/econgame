"use client";

import Button from "@/app/components/Buttons/Button";
import Header from "@/app/components/Header";
import PhoneLayout from "@/app/components/PhoneLayout";
import { useCard } from "@/context/CardModalContext";

export default function Read() {
  const { cardData, setModalState, setCardData } = useCard();

  const onClick = () => {
    setCardData(null);
    setModalState("reading");
    setTimeout(() => {
      if (cardData !== null) {
        setCardData(null);
      }
    }, 5000);
  };

  return (
    <PhoneLayout>
      <Header blueText="Read" backButtonLink="/terminal" />
      <div className="text-black">{JSON.stringify(cardData, null, 2)}</div>
      <Button bgColor="gray" onClick={onClick}>
        Read
      </Button>
    </PhoneLayout>
  );
}
