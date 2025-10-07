import {
  ApiPostCloseShoppingListRequest,
  ApiPostCloseShoppingListResponse,
} from "@/types/api/shoppingList";
import { prisma } from "@/util/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: ApiPostCloseShoppingListRequest = await request.json();

  try {
    const shoppingList = await prisma.shoppingList.findFirst({
      where: {
        cardId: body.cardId,
        completed: false,
      },
    });
    if (!shoppingList) {
      return NextResponse.json(
        { error: "Shopping list not found" },
        { status: 404 }
      );
    }

    if (shoppingList.completed) {
      return NextResponse.json(
        { error: "Shopping list already completed" },
        { status: 400 }
      );
    }

    await prisma.shoppingList.update({
      where: { id: shoppingList.id },
      data: { completed: true },
    });

    await prisma.transaction.updateMany({
      where: { cardId: body.cardId },
      data: { shoppingListId: shoppingList.id },
    });

    const response: ApiPostCloseShoppingListResponse = {
      name: shoppingList.name,
      cardId: shoppingList.cardId,
    };

    console.log(
      `Closed shopping list: ${shoppingList.name} by card ${shoppingList.cardId}`
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
