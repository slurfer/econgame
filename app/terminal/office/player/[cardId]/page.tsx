"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCard } from "@/context/CardModalContext";
import Button from "@/app/components/Buttons/Button";
import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";

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
  const [data, setData] = useState<ApiResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { setModalMessage, setModalState } = useCard(); // 🟢 modal from context

  async function handleClose() {
    const res = await fetch("/api/shoppingList/close", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardId: cardId,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      if (data && data.error) setModalMessage(data.error);
      setModalState("error");
      return;
    }
    setModalState("success");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/shoppingList/status/${cardId}`);

        const json: ApiResponse = await res.json();
        if (!res.ok || json.status !== "ok") {
          if (res.status === 404) {
            setModalMessage("Shopping list not found");
            setModalState("error");
            router.push("/terminal/office");
            return;
          }
          throw new Error(json.error || "Failed to fetch shopping list status");
        }
        if (!json.data) throw new Error("No data in response");

        setData(json.data);
      } catch (err: any) {
        // 🟥 show modal using context
        setModalMessage(err.message);
        setModalState("error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [cardId, setModalMessage, setModalState]);

  if (loading) return <div className="p-6 text-lg">Loading...</div>;

  if (!data) {
    return (
      <div className="p-6 text-red-600 text-lg">
        No data available for this card.
      </div>
    );
  }

  const boughtSet = new Set(data.boughtItems.map((i) => i.toLowerCase()));
  const desiredSet = new Set(data.desiredItems.map((i) => i.toLowerCase()));

  const missingItems = data.desiredItems.filter(
    (i) => !boughtSet.has(i.toLowerCase())
  );
  const extraItems = data.boughtItems.filter(
    (i) => !desiredSet.has(i.toLowerCase())
  );

  const buttonColor = missingItems.length === 0 ? "green" : "red";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header blackText="Finish" blueText="List" />
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">🛒 Shopping Report</h1>

        <div className="border-b pb-4">
          <p>
            <strong>Player:</strong> {data.name}
          </p>
          <p>
            <strong>Total spent:</strong> {data.totalSpent} CZK
          </p>
          <p>
            <strong>Items bought:</strong> {data.itemsBought}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Items Overview</h2>
          <ul className="space-y-1">
            {data.desiredItems.map((item) => {
              const isBought = boughtSet.has(item.toLowerCase());
              return (
                <li
                  key={item}
                  className={`p-2 rounded-lg ${
                    isBought
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800 font-semibold"
                  }`}
                >
                  {item} {isBought ? "✅" : "❌ Missing"}
                </li>
              );
            })}
          </ul>
        </div>

        {extraItems.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mt-6 mb-2 text-yellow-700">
              Extra / Redundant Items
            </h2>
            <ul className="space-y-1">
              {extraItems.map((item) => (
                <li
                  key={item}
                  className="p-2 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200"
                >
                  {item} ⚠️
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="pt-4 border-t" />
        <Button onClick={handleClose} bgColor={buttonColor}>
          {" "}
          Zavřít nákupní seznam
        </Button>
      </div>
    </div>
  );
}
