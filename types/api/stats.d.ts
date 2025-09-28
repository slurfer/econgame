export interface ApiGetStatsResponse {
  cards: {
    id: string;
    owner: string;
    balance: number;
    shoppingLists: number;
    unfinishedShoppingLists: number;
    transactions: number;
    points: number;
  }[];
}
