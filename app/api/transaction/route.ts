import {
  ApiPostTransactionRequest,
  ApiPostTransactionResponse,
} from "@/types/api/transaction";
import { prisma } from "@/util/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: ApiPostTransactionRequest = await request.json();

  try {
    const transaction = await prisma.transaction.create({
      data: {
        name: body.name,
        price: body.price,
        cardId: body.cardId,
      },
    });

    const response: ApiPostTransactionResponse = {
      name: transaction.name,
      price: transaction.price,
      cardId: transaction.cardId,
    };

    console.log("Payment received:", body);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      if (error.code === "P2003") {
        // Record not found
        return NextResponse.json(
          { error: "Card not found" },
          { status: 404 }
        );
      }
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Error processing payment" },
      { status: 500 }
    );
  }
}
