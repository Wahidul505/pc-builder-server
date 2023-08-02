/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Book } from '../book/book.model';
import { IWishList } from './wishList.interface';
import { WishList } from './wishList.model';

const addToWishList = async (id: string, user: string): Promise<void> => {
  if (id && user) {
    const isUserExist = await WishList.findOne({ user: user }).lean();
    const isBookExist = await Book.findById(id).lean();
    if (!isBookExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Book does not exist');
    } else if (isBookExist && !isUserExist) {
      const wishListData: IWishList = {
        user: user,
        wishList: [isBookExist._id],
      };
      await WishList.create(wishListData);
    } else if (isBookExist && isUserExist) {
      const wishLists = isUserExist.wishList.map(wishList =>
        wishList.toString()
      );
      const isWishListExist = wishLists.length
        ? wishLists.find(wishList => wishList === isBookExist._id.toString())
        : false;
      if (isWishListExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Book already wish-listed');
      }
      const payload = {
        wishList: [...isUserExist.wishList, isBookExist._id],
      };
      await WishList.findOneAndUpdate({ user: user }, payload);
    }
  }
};

const getWishList = async (user: string): Promise<IWishList> => {
  const wishList = await WishList.findOne({ user: user }).populate({
    path: 'wishList',
  });
  if (!wishList) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  return wishList;
};

export const WishListService = {
  addToWishList,
  getWishList,
};
