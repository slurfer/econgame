export interface ApiPostTransactionRequest {
  owner: string;
  price: number;
  cardId: string;
}

export interface ApiPostTransactionResponse {
  owner: string;
  price: number;
  cardId: string;
  balance: number;
}
