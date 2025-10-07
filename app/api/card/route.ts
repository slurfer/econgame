import { NextResponse } from "next/server";
import { prisma } from "@/util/prisma";
import { ApiGetStatsResponse } from "@/types/api/stats";
import { unfinishedShoppingListPenalty } from "@/config/config.json";

export async function GET() {
  const transaction_sums = await prisma.transaction.groupBy({
    by: ["cardId"],
    _count: {
      cardId: true,
    },
    _sum: {
      price: true,
    },
  });

  const cards = await prisma.card.findMany({
    select: {
      id: true,
      owner: true,
    },
  });

  const shoppingListsCount = await prisma.shoppingList.groupBy({
    by: ["cardId"],
    _count: {
      id: true,
    },
    _sum: {
      price: true,
    },
  });

  const unfinishedShoppingLists = await prisma.shoppingList.groupBy({
    by: ["cardId"],
    _count: {
      id: true,
    },
    _sum: {
      price: true,
    },
    where: {
      completed: false,
    },
  });

  console.log(cards);

  const response: ApiGetStatsResponse = {
    cards: cards.map((card) => {
      const transaction_sum =
        transaction_sums.find((t) => t.cardId === card.id)?._sum.price || 0;
      const transaction_count =
        transaction_sums.find((t) => t.cardId === card.id)?._count.cardId || 0;
      const shoppingListCount =
        shoppingListsCount.find((s) => s.cardId === card.id)?._count.id || 0;
      const unfinishedShoppingListCount =
        unfinishedShoppingLists.find((s) => s.cardId === card.id)?._count.id ||
        0;
      const unfinishedShoppingListSum =
        unfinishedShoppingLists.find((s) => s.cardId === card.id)?._sum.price ||
        0;

      const points =
        transaction_sum -
        unfinishedShoppingListSum -
        unfinishedShoppingListCount * unfinishedShoppingListPenalty;
      return {
        id: card.id,
        owner: card.owner,
        balance: transaction_sum,
        transactions: transaction_count,
        shoppingLists: shoppingListCount,
        unfinishedShoppingLists: unfinishedShoppingListCount,
        points: points,
      };
    }),
  };

  return NextResponse.json({ status: "ok", data: response });
}
