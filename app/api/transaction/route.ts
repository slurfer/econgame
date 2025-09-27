import { ApiTransactionRequest } from "@/types/api/transaction";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: ApiTransactionRequest = await request.json();
  console.log("Payment received:", body);
  return NextResponse.json({
    status: "ok",
  });
}
