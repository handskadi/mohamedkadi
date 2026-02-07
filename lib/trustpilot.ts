export type TrustpilotReview = {
  id: string | null;
  title: string | null;
  text: string;
  rating: number; // 1..5
  createdAt: string;
  consumer: string | null;
  avatarUrl: string | null;
  consumerProfileUrl: string | null;
};

export type TrustpilotResponse = {
  ok: boolean;
  status: number;
  url: string | null;
  scrapedAt: string | null;
  reviewsNum: number;
  rate: number | null;
  reviews: TrustpilotReview[];
};
