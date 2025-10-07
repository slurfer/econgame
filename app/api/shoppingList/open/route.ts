import {
  ApiPostOpenShoppingListRequest,
  ApiPostOpenShoppingListResponse,
} from "@/types/api/shoppingList";
import { prisma } from "@/util/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: ApiPostOpenShoppingListRequest = await request.json();

  try {
    const shoppingListExists = await prisma.shoppingList.findFirst({
      where: {
        cardId: body.cardId,
        completed: false,
      },
    });
    if (shoppingListExists) {
      return NextResponse.json(
        { error: "There is already an open shopping list for this card" },
        { status: 400 }
      );
    }

    console.log(body);
    const shoppingList = await prisma.shoppingList.create({
      data: {
        name: body.name,
        price: body.price,
        cardId: body.cardId,
      },
    });

    await prisma.transaction.create({
      data: {
        owner: body.name,
        price: body.price,
        cardId: body.cardId,
        shoppingListId: shoppingList.id,
        isExpense: false,
      },
    });

    const response: ApiPostOpenShoppingListResponse = {
      name: shoppingList.name,
      price: shoppingList.price,
      cardId: shoppingList.cardId,
    };

    console.log(
      `Opened shopping list: ${shoppingList.name} for ${shoppingList.price} Czk by card ${shoppingList.cardId}`
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
