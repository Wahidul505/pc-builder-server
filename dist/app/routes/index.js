"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = require("../modules/book/book.route");
const readingStatus_route_1 = require("../modules/readingStatus/readingStatus.route");
const wishList_route_1 = require("../modules/wishList/wishList.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/wish-list',
        route: wishList_route_1.WishListRoutes,
    },
    {
        path: '/reading-status',
        route: readingStatus_route_1.ReadingStatusRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
