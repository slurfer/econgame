"use client";
import { useCard } from "@/context/CardModalContext";
import { useEffect, useRef } from "react";
import Header from "@/app/components/Header";
import { shoppingLists } from "@/config/game.json";
import Button from "@/app/components/Buttons/Button";
import PhoneLayout from "@/app/components/PhoneLayout";

export default function ShopPage() {
  const {
    cardData,
    actionData,
    setActionData,
    setModalState,
    setCardData,
    setModalMessage,
  } = useCard();

  const paymentInProgress = useRef(false);

  useEffect(() => {
    if (cardData === null || actionData === null || paymentInProgress.current)
      return;
    paymentInProgress.current = true;
    setModalState("loading");
    const { name, price } = actionData;
    setActionData(null);

    async function handleOpen() {
      const res = await fetch("/api/shoppingList/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          price: Number(price),
          cardId: cardData,
        }),
      });
      paymentInProgress.current = false;
      const data = await res.json();
      if (!res.ok) {
        if (data && data.error) setModalMessage(data.error);
        setModalState("error");
        return;
      }
      setModalState("success");
    }

    async function handleClose() {
      const res = await fetch("/api/shoppingList/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          cardId: cardData,
        }),
      });
      paymentInProgress.current = false;
      const data = await res.json();
      if (!res.ok) {
        if (data && data.error) setModalMessage(data.error);
        setModalState("error");
        return;
      }
      setModalState("success");
    }

    if (actionData.price === 0) {
      handleClose();
    } else {
      handleOpen();
    }
    setCardData(null);
  }, [cardData, actionData]);

  return (
    <PhoneLayout>
      <Header
        blueText="Kancelář"
        showBackButton={true}
        backButtonLink="/terminal"
      />
      <br />
      {shoppingLists.map((list) => {
        const open = () => {
          setActionData({ name: list.name, price: list.price });
          setCardData(null);
          setModalState("reading");
        };
        const close = () => {
          setActionData({ name: list.name, price: 0 });
          setCardData(null);
          setModalState("reading");
        };
        return (
          <div className="w-full my-10" key={list.name}>
            <Button onClick={open} bgColor="green">
              {`Otevřít "${list.name}"`}
            </Button>
            <Button onClick={close} bgColor="orange">
              {`Dokončit "${list.name}"`}
            </Button>
          </div>
        );
      })}
    </PhoneLayout>
  );
}
