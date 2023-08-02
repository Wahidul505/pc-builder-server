"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const wishList_controller_1 = require("./wishList.controller");
const router = express_1.default.Router();
router.post('/:id', wishList_controller_1.WishListController.addToWishList);
router.get('/', wishList_controller_1.WishListController.getWishList);
exports.WishListRoutes = router;
