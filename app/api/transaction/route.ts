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
    const card = await prisma.card.findUnique({
      where: { id: body.cardId },
    });
    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    const cardBalance = await prisma.transaction.aggregate({
      _sum: { price: true },
      where: { cardId: body.cardId },
    });

    if ((cardBalance._sum.price ?? 0) - body.price < 0) {
      return NextResponse.json(
        { error: "Insufficient funds on card" },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        owner: body.owner,
        price: -body.price,
        cardId: body.cardId,
      },
    });

    const response: ApiPostTransactionResponse = {
      owner: transaction.owner,
      price: transaction.price,
      cardId: transaction.cardId,
      balance: (cardBalance._sum.price ?? 0) - body.price,
    };

    console.log(
      `Processed transaction: ${transaction.owner} for ${transaction.price} Czk`
    );
    return NextResponse.json(response);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      // Record not found
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Error processing payment" },
      { status: 500 }
    );
  }
}
