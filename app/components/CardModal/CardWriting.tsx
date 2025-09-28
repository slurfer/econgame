"use client";
import React, { useEffect, useState } from "react";
import { writeNfc } from "@/util/nfc";
import { Avatar, Button, Container, Typography } from "@mui/material";
import { Sensors } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useCard } from "@/context/CardModalContext";
import CardInteracting from "./CardInteracting";

export default function CardReading() {
  const { modalState, cardData, setCardData, setModalState } = useCard();

  useEffect(() => {
    if (cardData === null) {
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
