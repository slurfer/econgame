"use client";

import { useEffect, useState } from "react";
import PhoneLayout from "@/app/components/PhoneLayout";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import Button from "@/app/components/Buttons/Button";
import UserInfo from "@/app/components/UserInfo";
import { useCard } from "@/context/CardModalContext";

type Card = {
  id: string;
  owner: string;
  balance: number;
  transactions: number;
  shoppingLists: number;
  unfinishedShoppingLists: number;
  points: number;
};

export default function CardPage() {
  const { cardId }: { cardId: string } = useParams();
  const { cardData, setCardData, setModalState } = useCard();

  function handleReinit() {
    setCardData(cardId);
    setModalState("writing");
  }

  return (
    <PhoneLayout>
      <Header blueText="Card Info" backButtonLink="/terminal" />
      <UserInfo cardId={cardId} />
      <div className="h-6"></div>
      <Button bgColor="green" onClick={handleReinit}>
        ReinitCard
      </Button>
    </PhoneLayout>
  );
}
