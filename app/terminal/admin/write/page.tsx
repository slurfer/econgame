"use client";

import { useState } from "react";
import Button from "@/app/components/Buttons/Button";
import { useCard } from "@/context/CardModalContext";
import Header from "@/app/components/Header";

export default function Read() {
  const { cardData, setCardData, setModalState } = useCard();
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    // Tady můžeš uložit inputText do cardData, pokud chceš
    // např. setCardData({ ...cardData, userText: inputText });
    setCardData(inputText);
    setModalState("writing");
  };

  return (
    <div className="text-center text-black">
      <Header blueText="Write" backButtonLink="/terminal/admin" />

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
