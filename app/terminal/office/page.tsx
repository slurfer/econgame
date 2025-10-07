"use client";
import { useCard } from "@/context/CardModalContext";
import { useEffect, useRef } from "react";
import Header from "@/app/components/Header";
import { shoppingLists } from "@/data/lists.json";
import Button from "@/app/components/Buttons/Button";
import PhoneLayout from "@/app/components/PhoneLayout";
import { useRouter } from "next/navigation";

export default function ShopPage() {
  const {
    cardData,
    actionData,
    setActionData,
    setModalState,
    setCardData,
    setModalMessage,
  } = useCard();
  const router = useRouter();

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
      setModalState("closed");
      router.push(`/terminal/office/player/${cardData}`);
    }

    if (actionData.price === 0) {
      handleClose();
    } else {
      handleOpen();
    }
    setCardData(null);
  }, [cardData, actionData]);

  const close = () => {
    setActionData({ name: "", price: 0 });
    setCardData(null);
    setModalState("reading");
  };

  return (
    <PhoneLayout>
      <Header
        blueText="Kancelář"
        showBackButton={true}
        backButtonLink="/terminal"
      />
      <br />

      <Button onClick={close} bgColor="orange">
        Zavřít nákupní seznam
      </Button>
      <div className="h-4" />
      {shoppingLists.map((list) => {
        const open = () => {
          setActionData({ name: list.name, price: list.price });
          setCardData(null);
          setModalState("reading");
        };

        return (
          <div className="w-full" key={list.name}>
            <Button onClick={open} bgColor="green">
              {`Otevřít "${list.name}"`}
            </Button>
          </div>
        );
      })}
    </PhoneLayout>
  );
}
