"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCard } from "@/context/CardModalContext";
import Button from "@/app/components/Buttons/Button";
import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";
import ShoppingListOverview from "@/app/components/ShoppingListPlayerOverview";

type ApiResponse = {
  status: string;
  data?: {
    name: string;
    totalSpent: number;
    itemsBought: number;
    boughtItems: string[];
    desiredItems: string[];
  };
  error?: string;
};

export default function PlayerShoppingStatus() {
  const { cardId } = useParams<{ cardId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header blackText="Finish" blueText="List" />
      <ShoppingListOverview cardId={cardId} />
    </div>
  );
}
