"use client";

import CardReading from "@/app/components/CardModal/CardReading";
import CardError from "@/app/components/CardModal/CardError";
import CardSuccess from "@/app/components/CardModal/CardSuccess";
import CardWriting from "@/app/components/CardModal/CardWriting";
import Loading from "@/app/components/CardModal/Loading";
import { createContext, useContext, useState, ReactNode } from "react";

type ModalState =
  | "closed"
  | "reading"
  | "writing"
  | "error"
  | "success"
  | "loading";

type CardContextType = {
  modalState: ModalState;
  setModalState: (open: ModalState) => void;
  modalMessage: string | null;
  setModalMessage: (message: string | null) => void;
  cardData: string | null;
  setCardData: (data: string | null) => void;
  actionData: { name: string; price: number } | null;
  setActionData: (item: { name: string; price: number } | null) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cardData, setCardData] = useState<string | null>(null);
  const [modalState, setModalState] = useState("closed" as ModalState);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [actionData, setActionData] = useState<{
    name: string;
    price: number;
  } | null>(null);

  let content;

  if (modalState === "error") {
    content = <CardError />;
  } else if (modalState === "reading") {
    content = <CardReading />;
  } else if (modalState === "writing") {
    content = <CardWriting />;
  } else if (modalState === "success") {
    content = <CardSuccess />;
  } else if (modalState === "loading") {
    content = <Loading />;
  } else {
    content = children;
  }

  return (
    <CardContext.Provider
      value={{
        cardData,
        setCardData,
        modalState,
        setModalState,
        actionData: actionData,
        setActionData: setActionData,
        modalMessage,
        setModalMessage,
      }}
    >
      {content}
    </CardContext.Provider>
  );
}

export function useCard() {
  const ctx = useContext(CardContext);
  if (!ctx) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return ctx;
}
