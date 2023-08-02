"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const book_model_1 = require("../book/book.model");
const wishList_model_1 = require("./wishList.model");
const addToWishList = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (id && user) {
        const isUserExist = yield wishList_model_1.WishList.findOne({ user: user }).lean();
        const isBookExist = yield book_model_1.Book.findById(id).lean();
        if (!isBookExist) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book does not exist');
        }
        else if (isBookExist && !isUserExist) {
            const wishListData = {
                user: user,
                wishList: [isBookExist._id],
            };
            yield wishList_model_1.WishList.create(wishListData);
        }
        else if (isBookExist && isUserExist) {
            const wishLists = isUserExist.wishList.map(wishList => wishList.toString());
            const isWishListExist = wishLists.length
                ? wishLists.find(wishList => wishList === isBookExist._id.toString())
                : false;
            if (isWishListExist) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book already wish-listed');
            }
            const payload = {
                wishList: [...isUserExist.wishList, isBookExist._id],
            };
            yield wishList_model_1.WishList.findOneAndUpdate({ user: user }, payload);
        }
    }
});
const getWishList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const wishList = yield wishList_model_1.WishList.findOne({ user: user }).populate({
        path: 'wishList',
    });
    if (!wishList) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found');
    }
    return wishList;
});
exports.WishListService = {
    addToWishList,
    getWishList,
};
