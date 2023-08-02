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
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const book_model_1 = require("./book.model");
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.find();
    return books;
});
const getLatestBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.find().sort({ $natural: -1 }).limit(10);
    return books;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = book_model_1.Book.findById(id);
    return book;
});
const addNewBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload) {
        yield book_model_1.Book.create(payload);
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Something went wrong');
    }
});
const postReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingReviews = yield book_model_1.Book.findById(id, { reviews: 1 });
    const newReviews = (existingReviews === null || existingReviews === void 0 ? void 0 : existingReviews.reviews)
        ? [...existingReviews.reviews, payload.review]
        : [payload.review];
    if (payload && id) {
        yield book_model_1.Book.findOneAndUpdate({ _id: id }, { reviews: newReviews });
    }
});
const editBook = (id, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findOne({ _id: id, addedBy: user });
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to edit the book');
    }
    if (book && payload) {
        yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload);
    }
});
const deleteBook = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findOne({ _id: id, addedBy: user });
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to delete the book');
    }
    yield book_model_1.Book.findOneAndDelete({ _id: id });
});
exports.BookService = {
    getAllBooks,
    getLatestBooks,
    getSingleBook,
    addNewBook,
    postReview,
    editBook,
    deleteBook,
};
