"use client";
import React from "react";
import { useCard } from "@/context/CardModalContext";
import { Clear } from "@mui/icons-material";
import { Avatar, Container, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import CloseModal from "./CloseModal";

export default function CardError() {
  const { modalMessage } = useCard();
  return (
    <Container maxWidth="sm">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Avatar
          sx={{
            bgcolor: red[500],
            width: 156,
            height: 156,
          }}
        >
          <Clear style={{ fontSize: "5rem" }} />
        </Avatar>
        <div className="w-full m-[1.8rem]"></div>
        <Typography variant="h4" align="center">
          {modalMessage || "Error while changing card balance"}
        </Typography>
        <div className="w-full m-[4.2rem]"></div>
        <CloseModal />
      </div>
    </Container>
  );
}
