"use client";
import ItemButton from "@/app/components/Buttons/Button";
import LinkButton from "./components/Buttons/LinkButton";
import Header from "@/app/components/Header";
import PhoneLayout from "./components/PhoneLayout";

export default function Home() {
  return (
    <PhoneLayout>
      <Header
        blackText="Welcome to"
        blueText="EconGame!"
        showBackButton={false}
      />
      <LinkButton bgColor="green" link="/terminal">
        Terminal
      </LinkButton>
      <LinkButton bgColor="orange" link="/results">
        Results
      </LinkButton>
    </PhoneLayout>
  );
}
