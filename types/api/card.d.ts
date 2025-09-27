export interface ApiPostCardRequest {
  owner: string;
}

export interface ApiPostCardResponse {
  status: "ok" | "error";
  data?: Card;
  error?: string;
}

export interface Card {
  id: string;
  owner: string;
  balance: number;
}
