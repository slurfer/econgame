import { NextResponse } from "next/server";
import { prisma } from "@/util/prisma";
import { ApiPostCardRequest, ApiPostCardResponse } from "@/types/api/card";
import { ApiCardCardIdResponse, ApiGetStatsResponse } from "@/types/api/stats";
import { unfinishedShoppingListPenalty } from "@/config/config.json";
import { notFound } from "next/navigation";

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

  const transactionData = await prisma.transaction.aggregate({
    where: { cardId },
    _count: {
      cardId: true,
    },
    _sum: {
      price: true,
    },
  });

  const shoppingListsData = await prisma.shoppingList.aggregate({
    where: { cardId },
    _count: {
      id: true,
    },
  });

  const unfinishedShoppingData = await prisma.shoppingList.aggregate({
    where: { cardId, completed: false },
    _count: {
      id: true,
    },
    _sum: {
      price: true,
    },
  });

  console.log(card);
  if (!card) {
    notFound();
  }

  const balance = transactionData._sum.price || 0;
  const shoppingLists = shoppingListsData._count.id || 0;
  const unfinishedShoppingLists = unfinishedShoppingData._count.id || 0;
  const transactions = transactionData._count.cardId || 0;
  const points =
    balance -
    (unfinishedShoppingData._sum.price || 0) -
    unfinishedShoppingLists * unfinishedShoppingListPenalty;

  const response: ApiCardCardIdResponse = {
    id: card.id,
    owner: card.owner,
    balance: balance,
    shoppingLists: shoppingLists,
    unfinishedShoppingLists: unfinishedShoppingLists,
    transactions: transactions,
    points: points,
  };

  return NextResponse.json({ status: "ok", data: response });
}
