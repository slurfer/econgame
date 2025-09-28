'use client";';

import { useCard } from "@/context/CardModalContext";
import { Button } from "@mui/material";

export default function CloseModal() {
  const { setModalState, setModalMessage } = useCard();
  function onClick() {
    setModalMessage(null);
    setModalState("closed");
  }
  return (
    <Button variant="contained" fullWidth onClick={onClick}>
      RETURN
    </Button>
  );
}
