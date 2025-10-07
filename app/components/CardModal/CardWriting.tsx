"use client";
import React, { useEffect } from "react";
import { writeNfc } from "@/util/nfc";
import { useCard } from "@/context/CardModalContext";
import CardInteracting from "./CardInteracting";
import { useSession } from "next-auth/react";

export default function CardReading() {
  const { modalState, cardData, setCardData, setModalState, setModalMessage } =
    useCard();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      setModalState("loading");
      return;
    }
    if (status === "unauthenticated") {
      setModalMessage("Not logged in");
      setModalState("error");
      return;
    }
    if (session?.user?.role !== "admin") {
      setModalMessage("Access Denied");
      setModalState("error");
      return;
    }
    if (cardData === null) {
      setModalMessage("No Card Data");
      setModalState("error");
      return;
    }
    writeNfc(
      cardData,
      () => {
        setCardData(null);
        setModalState("success");
      },
      () => {
        setCardData(null);
        setModalState("error");
      }
    );
  }, [modalState]);

  return <CardInteracting />;
}
