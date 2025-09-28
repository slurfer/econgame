"use client";
import Item from "@/app/components/Item";
import { notFound, useParams } from "next/navigation";
import { useCard } from "@/context/CardModalContext";
import { useEffect, useRef, useState } from "react";
import Header from "@/app/components/Header";
import RefreshCounter from "@/app/components/RefreshCounter";
import { useShopData } from "@/context/ShopDataContext";
import { shoppingLists } from "@/config/game.json";
import ShoppingList from "@/app/components/ShoppingList";
import Button from "@/app/components/Buttons/Button";
import PhoneLayout from "@/app/components/PhoneLayout";

export default function ShopPage() {
  const { cardData, buyItem, setBuyItem, setModalState, setCardData } =
    useCard();

  const paymentInProgress = useRef(false);

  useEffect(() => {
    if (cardData === null || buyItem === null || paymentInProgress.current)
      return;
    paymentInProgress.current = true;
    setModalState("loading");
    const { name, price } = buyItem;
    setBuyItem(null);

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
      setModalState(res.ok ? "success" : "error");
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
      setModalState(res.ok ? "success" : "error");
    }

    if (buyItem.price === 0) {
      handleClose();
    } else {
      handleOpen();
    }
    setCardData(null);
  }, [cardData, buyItem]);

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
          setBuyItem({ name: list.name, price: list.price });
          setCardData(null);
          setModalState("reading");
        };
        const close = () => {
          setBuyItem({ name: list.name, price: 0 });
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
