import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/latest-books', BookController.getLatestBooks);
router.get('/:id', BookController.getSingleBook);
router.get('/', BookController.getAllBooks);
router.post('/add-book', BookController.addNewBook);
router.patch('/review/:id', BookController.postReview);
router.patch('/:id', BookController.editBook);
router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
