import {
  ApiPostTransactionRequest,
  ApiPostTransactionResponse,
} from "@/types/api/transaction";
import { prisma } from "@/util/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

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
    writeToStream(response);
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

const clients: ReadableStreamDefaultController<Uint8Array>[] = [];

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      clients.push(controller);

      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(`data: Připojeno k SSE streamu\n\n`));

      // Odstranění klienta při odpojení
      req.signal.addEventListener("abort", () => {
        const index = clients.indexOf(controller);
        if (index !== -1) clients.splice(index, 1);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export function writeToStream(data: any) {
  const encoder = new TextEncoder();
  const payload = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);

  for (const controller of clients) {
    try {
      controller.enqueue(payload);
    } catch (err) {
      console.error("Chyba při zápisu do streamu:", err);
    }
  }
}
