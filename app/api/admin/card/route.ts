import { NextResponse } from "next/server";
import { prisma } from "@/util/prisma";
import { ApiPostCardRequest, ApiPostCardResponse } from "@/types/api/card";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  const { owner }: ApiPostCardRequest = await request.json();
  try {
    const card = await prisma.card.create({
      data: {
        owner,
        transactions: {
          create: { owner, price: 500, isExpense: false },
        },
      },
    });
    const response: ApiPostCardResponse = {
      status: "ok",
      data: {
        id: card.id,
        owner: card.owner,
        balance: card.balance,
      },
    };
    return NextResponse.json(response);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Card owner must be unique" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Error creating card" }, { status: 500 });
  }
}
