import { NextResponse } from "next/server";
import { prisma } from "@/util/prisma";
import { ApiCardCardIdResponse } from "@/types/api/stats";
import { unfinishedShoppingListPenalty } from "@/config/config.json";
import { notFound } from "next/navigation";
import { shoppingLists } from "@/data/lists.json";
import { items } from "@/data/items.json";
import { ApiGetShoppingListStatsResponse } from "@/types/api/shoppingList";

export async function GET(
  req: Request,
  context: { params: Promise<{ cardId: string }> }
) {
  const { cardId } = await context.params;

  const card = await prisma.card.findUnique({
    where: { id: cardId },
    select: {
      id: true,
      owner: true,
    },
  });

  const databaseShoppingList = await prisma.shoppingList.findFirst({
    where: { cardId, completed: false },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  const transactions = await prisma.transaction.findMany({
    where: { cardId, shoppingListId: null },
    select: {
      owner: true,
      price: true,
    },
  });

  const shoppingListTemplate = shoppingLists.find(
    (list) => list.name === databaseShoppingList?.name
  );

  if (!card || !databaseShoppingList || !shoppingListTemplate) {
    return NextResponse.json(
      { status: "error", error: "Shopping list not found" },
      { status: 404 }
    );
  }

  const response: ApiGetShoppingListStatsResponse = {
    name: shoppingListTemplate.name,
    totalSpent: Math.abs(transactions.reduce((acc, tx) => acc + tx.price, 0)),
    itemsBought: transactions.length,
    boughtItems: transactions.map((tx) => tx.owner),
    desiredItems: shoppingListTemplate.items,
  };

  return NextResponse.json({ status: "ok", data: response });
}
