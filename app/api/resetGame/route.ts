import { prisma } from "@/util/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.transaction.deleteMany();
  await prisma.card.deleteMany();

  return NextResponse.json({ status: "ok" });
}
