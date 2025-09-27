import { NextResponse } from "next/server";
import { prisma } from "@/util/prisma";
import { ApiPostCardRequest, ApiPostCardResponse } from "@/types/api/card";

export async function POST(request: Request) {
  const { owner }: ApiPostCardRequest = await request.json();
  const card = await prisma.card.create({
    data: {
      owner,
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
}
