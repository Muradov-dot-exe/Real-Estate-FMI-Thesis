export interface Specs {
  name: string;
  RAM: number[];
  VideoCard: string[];
  VRAM: number[];
}

export interface Prices {
  mbPrice: number;
  ramPrice: number[];
  videoCardPriceLow: number;
  videoCardPriceHigh: number;
  vramPriceHigh: number;
  vramPriceLow: number;
}
