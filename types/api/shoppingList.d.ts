export interface ApiPostOpenShoppingListRequest {
  name: string;
  price: number;
  cardId: string;
}

export interface ApiPostOpenShoppingListResponse {
  name: string;
  price: number;
  cardId: string;
}

export interface ApiPostCloseShoppingListRequest {
  name: string;
  cardId: string;
}

export interface ApiPostCloseShoppingListResponse {
  name: string;
  cardId: string;
}
