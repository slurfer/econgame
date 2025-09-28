import { NextResponse } from "next/server";
import config from "@/config/game.json";
import { ItemType, ShopType } from "@/types/ItemType";
import { ApiPrices } from "@/types/api/response/prices";
import { refreshInterval } from "@/config/config.json";

function getRandomItem<T>(list: T[]): T {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

function getPricesForItem(
  item: ItemType,
  shops: string[]
): { [shop: string]: number } {
  const prices: { [shop: string]: number } = {};
  shops.forEach((shop) => {
    prices[shop] = getRandomItem(item.prices);
  });
  return prices;
}

let prices: ApiPrices | null = null;
let pricesLock = false;

function setPrices() {
  console.log("Setting new prices...");
  const items: ItemType[] = config.items;
  const shops: ShopType[] = config.shops;
  const shopNames = shops.map((shop) => shop.name);

  prices = {
    items: items.map((item) => ({
      name: item.name,
      prices: getPricesForItem(item, shopNames),
      normalPrice: Math.max(...item.prices),
    })),
    shops: shopNames,
    timestamp: Date.now() - (Date.now() % refreshInterval),
  };
}

async function setPricesGuard() {
  if (!pricesLock) {
    pricesLock = true;
    setPrices();
    pricesLock = false;
  } else {
    await new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (!pricesLock) {
          clearInterval(intervalId);
          resolve(true);
        }
      }, 100);
    });
  }
}

export async function GET() {
  if (!prices || Date.now() - prices.timestamp > refreshInterval) {
    await setPricesGuard();
  }

  return NextResponse.json({ status: "ok", data: prices });
}
