"use client";

import { useState } from "react";
import Button from "@/app/components/Buttons/Button";
import { useCard } from "@/context/CardModalContext";
import Header from "@/app/components/Header";
import { ApiPostCardResponse } from "@/types/api/card";

export default function Read() {
  const { cardData, setCardData, setModalState } = useCard();
  const [inputText, setInputText] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner: inputText }),
    });
    if (!res.ok) {
      setModalState("error");
      return;
    }
    const data: ApiPostCardResponse = await res.json();
    if (!data.data) {
      setModalState("error");
      return;
    }
    alert(data.data.id);

    setCardData(data.data.id);
    setModalState("writing");
  };

  return (
    <div className="text-center">
      <Header blueText="Write" backButtonLink="/terminal" />

      <div className="my-5">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full p-2 border rounded-md"
        />
      </div>

      <pre>{JSON.stringify(cardData, null, 2)}</pre>

      <Button bgColor="gray" onClick={handleSubmit}>
        Submit & Write
      </Button>
    </div>
  );
}
