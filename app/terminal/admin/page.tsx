"use client";

import { useCard } from "@/context/CardModalContext";
import Header from "@/app/components/Header";
import PhoneLayout from "@/app/components/PhoneLayout";
import LinkButton from "@/app/components/Buttons/LinkButton";
import shopConfig from "@/data/shops.json"; // static import
import { ShopType } from "@/types/ItemType";

export default function Home() {
  // Extract shops from JSON
  const shops: ShopType[] = shopConfig.shops;
  const { setModalState } = useCard();

  return (
    <PhoneLayout>
      <Header
        blueText="Admin"
        showBackButton={true}
        backButtonLink="/terminal"
      />

      <div className="my-4"></div>

      <LinkButton bgColor="green" link="/terminal/admin/cardInfo">
        Get card info
      </LinkButton>
      <LinkButton bgColor="orange" link="/terminal/admin/addPlayers">
        Add players
      </LinkButton>
      <LinkButton bgColor="gray" link="/terminal/admin/initCard">
        Init card
      </LinkButton>
      <div className="w-full h-15"></div>
      <LinkButton bgColor="gray" link="/terminal/admin/read">
        Read
      </LinkButton>
      <LinkButton bgColor="gray" link="/terminal/admin/write">
        Write
      </LinkButton>
      <div className="w-full h-15"></div>
      <LinkButton bgColor="red" link="/terminal/admin/resetGame">
        Reset game
      </LinkButton>
    </PhoneLayout>
  );
}
