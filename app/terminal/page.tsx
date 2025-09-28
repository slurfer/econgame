"use client";

import { useCard } from "@/context/CardModalContext";
import Header from "../components/Header";
import PhoneLayout from "../components/PhoneLayout";
import LinkButton from "@/app/components/Buttons/LinkButton";
import config from "@/config/game.json"; // static import
import { ShopType } from "@/types/ItemType";
import Button from "../components/Buttons/Button";
import resetGame from "@/util/resetGame";

export default function Home() {
  // Extract shops from JSON
  const shops: ShopType[] = config.shops;
  const { setModalState } = useCard();

  return (
    <PhoneLayout>
      <Header blueText="Terminal" showBackButton={true} backButtonLink="/" />

      <div className="my-4"></div>

      {/* Shops buttons */}
      {shops.map((shop) => (
        <LinkButton
          key={shop.name}
          bgColor={shop.color}
          link={`/terminal/shops/${shop.name}`}
        >
          {shop.name}
        </LinkButton>
      ))}

      {/* Other terminal actions */}
      <div className="w-full h-15"></div>
      <LinkButton bgColor="orange" link="/terminal/office">
        Office
      </LinkButton>
      <LinkButton bgColor="gray" link="/terminal/initCard">
        Init card
      </LinkButton>
      <LinkButton bgColor="gray" link="/terminal/read">
        Read
      </LinkButton>
      <LinkButton bgColor="gray" link="/terminal/write">
        Write
      </LinkButton>
    </PhoneLayout>
  );
}
