import { Model } from 'mongoose';

export type IPcPart = {
  image: string;
  productName: string;
  category: string;
  status: 'In Stock' | 'Out of stock';
  price: number;
  description: string;
  keyFeatures?: string[];
  individualRating?: number;
  averageRating: number;
  reviews?: string[];
};

export type PcPartModel = Model<IPcPart, Record<string, unknown>>;
