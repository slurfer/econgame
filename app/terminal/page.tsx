"use client";

import { useCard } from "@/context/CardModalContext";
import Header from "../components/Header";
import PhoneLayout from "@/app/components/PhoneLayout";
import LinkButton from "@/app/components/Buttons/LinkButton";
import shopConfig from "@/data/shops.json"; // static import
import { ShopType } from "@/types/ItemType";
import Logout from "@/app/components/Logout";

export default function Home() {
  // Extract shops from JSON
  const shops: ShopType[] = shopConfig.shops;
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
      <LinkButton bgColor="green" link="/terminal/cardInfo">
        Get card info
      </LinkButton>
      <div className="w-full h-15"></div>
      <Logout />
      <LinkButton bgColor="gray" link="/terminal/admin">
        Admin
      </LinkButton>
    </PhoneLayout>
  );
}
