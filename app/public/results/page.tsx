"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Card = {
  id: string;
  owner: string;
  balance: number;
  transactions: number;
  shoppingLists: number;
  unfinishedShoppingLists: number;
  points: number;
};

export default function CompetitionPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = () => {
    fetch("/api/card")
      .then((res) => res.json())
      .then((data) => {
        const sortedCards = data.data.cards.sort(
          (a: Card, b: Card) => b.points - a.points
        );
        setCards(sortedCards);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCards(); // načtení při startu

    const interval = setInterval(() => {
      fetchCards(); // obnovování každou minutu
    }, 30000);

    return () => clearInterval(interval); // vyčištění intervalu při odchodu z komponenty
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">EconGame 🏆</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">👤 Player</th>
              <th className="px-4 py-2">💰 Balance</th>
              <th className="px-4 py-2">📈 Transactions</th>
              <th className="px-4 py-2">🛒 Shopping Lists</th>
              <th className="px-4 py-2">❗ Unfinished</th>
              <th className="px-4 py-2">⭐ Points</th>
            </tr>
          </thead>
          <tbody>
            {cards
              .map((card, index) => (
                <tr
                  key={card.id}
                  className="border-t border-gray-300 hover:bg-gray-100"
                >
                  <td className="px-4 py-2 font-bold">{index + 1}</td>
                  <td className="px-4 py-2">{card.owner}</td>
                  <td className="px-4 py-2">{card.balance}</td>
                  <td className="px-4 py-2">{card.transactions}</td>
                  <td className="px-4 py-2">{card.shoppingLists}</td>
                  <td className="px-4 py-2">{card.unfinishedShoppingLists}</td>
                  <td
                    className={`px-4 py-2 font-bold ${
                      card.points < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {card.points}
                  </td>
                </tr>
              ))
              .slice(0, 10)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
