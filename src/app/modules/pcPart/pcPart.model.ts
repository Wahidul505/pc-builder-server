import { Schema, model } from 'mongoose';
import { IPcPart, PcPartModel } from './pcPart.interface';

const PcPartSchema = new Schema<IPcPart, PcPartModel>({
  image: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['In Stock', 'Out of stock'],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keyFeatures: {
    type: [String],
  },
  individualRating: {
    type: Number,
  },
  averageRating: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [String],
  },
});

export const PcPart = model<IPcPart, PcPartModel>('PcPart', PcPartSchema);
