export interface ApiGetStatsResponse {
  cards: ApiCardCardIdResponse[];
}

export interface ApiCardCardIdResponse {
  id: string;
  owner: string;
  balance: number;
  shoppingLists: number;
  unfinishedShoppingLists: number;
  transactions: number;
  points: number;
}
