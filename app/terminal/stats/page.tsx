"use client";

import { useCard } from "@/context/CardModalContext";
import Header from "@/app/components/Header";
import PhoneLayout from "@/app/components/PhoneLayout";
import LinkButton from "@/app/components/Buttons/LinkButton";
import shopConfig from "@/data/shops.json"; // static import
import { ShopType } from "@/types/ItemType";

export default function Home() {
  return (
    <PhoneLayout>
      <Header
        blueText="Statistics"
        showBackButton={true}
        backButtonLink="/terminal"
      />

      <div className="my-4"></div>

      <LinkButton bgColor="green" link="/terminal/stats/results">
        Private results
      </LinkButton>
      <LinkButton bgColor="orange" link="/terminal/stats/transactions">
        Transactions
      </LinkButton>
    </PhoneLayout>
  );
}
