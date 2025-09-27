import { ApiResponse } from "./response/response";

export interface ApiPrices {
  items: {
    name: string;
    prices: { [shop: string]: number };
    normalPrice: number;
  }[];
  shops: string[];
  timestamp: number;
}
