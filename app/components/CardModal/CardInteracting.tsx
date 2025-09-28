"use client";
import React from "react";
import { Avatar, Container, Typography } from "@mui/material";
import { Sensors } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import CloseModal from "./CloseModal";

export default function CardInteracting() {
  return (
    <Container maxWidth="sm">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Avatar
          sx={{
            bgcolor: blue[500],
            width: 156,
            height: 156,
          }}
        >
          <Sensors style={{ fontSize: "5rem" }} />
        </Avatar>

        <div className="w-full m-[1.8rem]"></div>

        <Typography variant="h6">Hold the card near the reader</Typography>

        <div className="w-full m-[4.2rem]"></div>

        <CloseModal />
      </div>
    </Container>
  );
}
