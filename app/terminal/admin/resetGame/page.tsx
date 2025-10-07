"use client";
import { useCard } from "@/context/CardModalContext";
import Button from "@/app/components/Buttons/Button";
import PhoneLayout from "@/app/components/PhoneLayout";
import Header from "@/app/components/Header";

export default function ResetGame() {
  const { setModalState } = useCard();

  const onResetGame = async () => {
    const res = await fetch("/api/admin/resetGame", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    setModalState(res.ok ? "success" : "error");
  };

  return (
    <PhoneLayout>
      <Header
        blackText="Reset"
        blueText="Game"
        backButtonLink="/terminal/admin"
      />
      <div className="text-2xl"> DANGER ZONE: </div>

      <Button bgColor="red" onClick={onResetGame}>
        Reset Game
      </Button>
    </PhoneLayout>
  );
}
