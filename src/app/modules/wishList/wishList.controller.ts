import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IWishList } from './wishList.interface';
import { WishListService } from './wishList.service';

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.headers.authorization;
  await WishListService.addToWishList(id, user as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Wish listed!',
  });
});
const getWishList = catchAsync(async (req: Request, res: Response) => {
  const user = req.headers.authorization;
  const wishList = await WishListService.getWishList(user as string);
  sendResponse<IWishList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wish list retrieved',
    data: wishList,
  });
});

export const WishListController = {
  addToWishList,
  getWishList,
};
