"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.get('/latest-books', book_controller_1.BookController.getLatestBooks);
router.get('/:id', book_controller_1.BookController.getSingleBook);
router.get('/', book_controller_1.BookController.getAllBooks);
router.post('/add-book', book_controller_1.BookController.addNewBook);
router.patch('/review/:id', book_controller_1.BookController.postReview);
router.patch('/:id', book_controller_1.BookController.editBook);
router.delete('/:id', book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
