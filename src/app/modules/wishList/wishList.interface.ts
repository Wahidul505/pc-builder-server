import { Model, Types } from 'mongoose';
import { IBook } from '../book/book.interface';

export type IWishList = {
  user: string;
  wishList: Types.ObjectId[] | IBook[];
};

export type WishListModel = Model<IWishList, Record<string, unknown>>;
