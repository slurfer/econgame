"use client";
import React, { useEffect, useState } from "react";
import { useCard } from "@/context/CardModalContext";
import { Check, Clear } from "@mui/icons-material";
import { Avatar, Button, Container, Typography } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import CloseModal from "./CloseModal";

export default function CardSuccess() {
  const { modalMessage } = useCard();
  return (
    <Container maxWidth="sm">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Avatar
          sx={{
            bgcolor: green[500],
            width: 156,
            height: 156,
          }}
        >
          <Check style={{ fontSize: "5rem" }} />
        </Avatar>
        <div className="w-full m-[1.8rem]"></div>
        <Typography variant="h4" align="center">
          {modalMessage || "Information written successfully"}
        </Typography>
        <div className="w-full m-[4.2rem]"></div>
        <CloseModal />
      </div>
    </Container>
  );
}
