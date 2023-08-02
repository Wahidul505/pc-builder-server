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
exports.ReadingStatusService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const book_model_1 = require("../book/book.model");
const readingStatus_model_1 = require("./readingStatus.model");
const changeStatus = (id, status, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (id && user && status) {
        if (status === 'reading' ||
            status === 'will-read' ||
            status === 'finished') {
            const isUserExist = yield readingStatus_model_1.ReadingStatus.findOne({ user: user }).lean();
            const isBookExist = yield book_model_1.Book.findById(id).lean();
            if (!isBookExist) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book does not exist');
            }
            else if (isBookExist && !isUserExist) {
                const statusData = {
                    user: user,
                    bookList: [{ book: isBookExist._id, status }],
                };
                yield readingStatus_model_1.ReadingStatus.create(statusData);
            }
            else if (isBookExist && isUserExist) {
                const bookExistOnStatus = isUserExist.bookList.find(book => book.book.toString() === isBookExist._id.toString());
                if (bookExistOnStatus) {
                    const restBooks = isUserExist.bookList.filter(book => book.book.toString() !== isBookExist._id.toString());
                    const updatedBooks = [...restBooks, Object.assign(Object.assign({}, bookExistOnStatus), { status })];
                    yield readingStatus_model_1.ReadingStatus.findOneAndUpdate({ user: user }, { user, bookList: updatedBooks });
                }
                else {
                    const newBook = { book: isBookExist._id, status };
                    const updatedBooks = [...isUserExist.bookList, newBook];
                    yield readingStatus_model_1.ReadingStatus.findOneAndUpdate({ user: user }, { user, bookList: updatedBooks });
                }
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Status should be "reading", "will-read" or "finished"');
        }
    }
});
const getStatus = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield readingStatus_model_1.ReadingStatus.findOne({ user: user }).populate({
        path: 'bookList',
        populate: [
            {
                path: 'book',
            },
        ],
    });
    if (!data) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found');
    }
    return data;
});
exports.ReadingStatusService = {
    changeStatus,
    getStatus,
};
