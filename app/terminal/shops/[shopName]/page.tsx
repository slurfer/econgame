"use client";
import Item from "@/app/components/Item";
import { notFound, useParams } from "next/navigation";
import { useCard } from "@/context/CardModalContext";
import { useEffect, useRef, useState } from "react";
import Header from "@/app/components/Header";
import RefreshCounter from "@/app/components/RefreshCounter";
import { useShopData } from "@/context/ShopDataContext";
import { shops as staticShops } from "@/config/game.json";

function getShopColor(shopName: string): string {
  const shop = staticShops.find((s) => s.name === shopName);
  return shop ? shop.color : "gray";
}

export default function ShopPage() {
  const { cardData, buyItem, setBuyItem, setModalState, setCardData } =
    useCard();
  const { items, shops } = useShopData();
  const { shopName }: { shopName: string } = useParams();

  if (shops.length > 0 && !shops.includes(shopName)) {
    notFound();
  }

  const paymentInProgress = useRef(false);

  useEffect(() => {
    if (cardData === null || buyItem === null || paymentInProgress.current)
      return;
    paymentInProgress.current = true;
    setModalState("loading");
    const { name, price } = buyItem;
    setBuyItem(null);

    async function handlePayment() {
      const res = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner: name,
          price: Number(price),
          cardId: cardData,
        }),
      });
      paymentInProgress.current = false;
      setModalState(res.ok ? "closed" : "error");
    }

    handlePayment();
    setCardData(null);
  }, [cardData, buyItem]);

  return (
    <div
      className="lg:pl-4 h-screen relative"
      style={{ backgroundColor: getShopColor(shopName) }}
    >
      <div className="bg-white h-full pt-2 overflow-auto shadow-lg">
        <Header
          blueText={shopName}
          showBackButton={true}
          backButtonLink="/terminal"
        />
        <br />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
          {items.map((item) => {
            const onClick = () => {
              setBuyItem({ name: item.name, price: item.prices[shopName] });
              setCardData(null);
              setModalState("reading");
            };
            return (
              <div onClick={onClick} key={item.name}>
                <Item
                  bgColor={getShopColor(shopName)}
                  name={item.name}
                  price={item.prices[shopName]} // cena pro aktuální shop
                  normalPrice={item.normalPrice} // běžná cena
                />
              </div>
            );
          })}
        </div>
        <RefreshCounter />
      </div>
    </div>
  );
}
