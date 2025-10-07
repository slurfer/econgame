"use client";

import { useEffect, useState } from "react";
import PhoneLayout from "@/app/components/PhoneLayout";
import Header from "@/app/components/Header";
import ShoppingListPlayerOverview from "@/app/components/ShoppingListPlayerOverview";

type Card = {
  id: string;
  owner: string;
  balance: number;
  transactions: number;
  shoppingLists: number;
  unfinishedShoppingLists: number;
  points: number;
};

export default function UserInfo({ cardId }: { cardId: string }) {
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCard = () => {
    fetch(`/api/card/${cardId}`)
      .then((res) => res.json())
      .then((data) => {
        setCard(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCard();
  }, []);

  if (loading) {
    return (
      <PhoneLayout>
        <div className="text-center mt-20 text-xl">Loading...</div>
      </PhoneLayout>
    );
  }

  if (!card) {
    return (
      <PhoneLayout>
        <Header blueText="Card Info" backButtonLink="/terminal" />
        <div className="text-center mt-20 text-xl text-red-600">
          Card not found.
        </div>
      </PhoneLayout>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Player Card</h1>
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Player:</span>
          <span>{card.owner}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Balance:</span>
          <span>💰 {card.balance}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Transactions:</span>
          <span>📈 {card.transactions}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Shopping Lists:</span>
          <span>🛒 {card.shoppingLists}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Unfinished:</span>
          <span>❗ {card.unfinishedShoppingLists}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Points:</span>
          <span
            className={`font-bold ${
              card.points < 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            ⭐ {card.points}
          </span>
        </div>
      </div>
      <ShoppingListPlayerOverview cardId={cardId} showCloseButton={false} />
    </div>
  );
}
