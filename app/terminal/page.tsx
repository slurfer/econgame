"use client";

import { useCard } from "@/context/CardModalContext";
import Header from "../components/Header";
import PhoneLayout from "@/app/components/PhoneLayout";
import LinkButton from "@/app/components/Buttons/LinkButton";
import shopConfig from "@/data/shops.json"; // static import
import { ShopType } from "@/types/ItemType";
import { useSession } from "next-auth/react";

export default function Home() {
  // Extract shops from JSON
  const shops: ShopType[] = shopConfig.shops;
  const { data: session, status } = useSession();

  return (
    <PhoneLayout>
      <Header blueText="Terminal" showBackButton={true} backButtonLink="/" />

      <div className="my-4"></div>

      {/* Shops buttons */}
      {shops.map((shop) => (
        <LinkButton
          key={shop.name}
          bgColor={shop.bgColor}
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
      <LinkButton bgColor="blue" link="/terminal/stats">
        Statistics
      </LinkButton>
      <div className="w-full h-15"></div>
      {session?.user?.role === "admin" && (
        <LinkButton bgColor="gray" link="/terminal/admin">
          Admin
        </LinkButton>
      )}
    </PhoneLayout>
  );
}
