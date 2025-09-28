"use client";

import { useState } from "react";
import Button from "@/app/components/Buttons/Button";
import { useCard } from "@/context/CardModalContext";
import Header from "@/app/components/Header";
import { ApiPostCardResponse } from "@/types/api/card";
import PhoneLayout from "@/app/components/PhoneLayout";

export default function Read() {
  const { cardData, setCardData, setModalState, setModalMessage } = useCard();
  const [inputText, setInputText] = useState("");

  const handleSubmit = async () => {
    setModalState("loading");
    const res = await fetch("/api/card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner: inputText }),
    });
    const data: ApiPostCardResponse = await res.json();
    if (!res.ok) {
      if (data && data.error) setModalMessage(data.error);
      setModalState("error");
      return;
    }
    if (!data.data) {
      setModalState("error");
      return;
    }

    setCardData(data.data.id);
    setModalState("writing");
  };

  return (
    <PhoneLayout>
      <div className="text-center">
        <Header blueText="Init card" backButtonLink="/terminal" />

        <div className="my-5 text-black">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full p-2 border rounded-md"
          />
        </div>

        <Button bgColor="gray" onClick={handleSubmit}>
          Submit & Write
        </Button>
      </div>
    </PhoneLayout>
  );
}
