import mongoose, { Schema, model } from 'mongoose';
import { IWishList, WishListModel } from './wishList.interface';

const WishListSchema = new Schema<IWishList, WishListModel>({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  wishList: {
    type: [mongoose.Types.ObjectId],
    ref: 'Book',
  },
});

export const WishList = model<IWishList, WishListModel>(
  'WishList',
  WishListSchema
);
