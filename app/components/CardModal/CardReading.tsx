"use client";
import React, { useEffect } from "react";
import { decodeNfcRecord, readNfc } from "@/util/nfc";
import { useCard } from "@/context/CardModalContext";
import CardInteracting from "./CardInteracting";

export default function CardReading() {
  const { cardData, modalState, setModalState, setCardData } = useCard();

  useEffect(() => {
    if (modalState !== "reading" || cardData !== null) return;
    readNfc(
      (message) => {
        setCardData(decodeNfcRecord(message.records[0]));
        setModalState("closed");
      },
      () => setModalState("error")
    );
  }, [modalState]);

  return <CardInteracting />;
}
