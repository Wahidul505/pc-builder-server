import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBook, IBookReview } from './book.interface';
import { BookService } from './book.service';

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await BookService.getAllBooks();

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully !',
    data: books,
  });
});

const getLatestBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await BookService.getLatestBooks();

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully !',
    data: books,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully !',
    data: book,
  });
});

const addNewBook = catchAsync(async (req: Request, res: Response) => {
  const bookData: IBook = req.body;
  await BookService.addNewBook(bookData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added successfully !',
  });
});

const postReview = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const reviewData: IBookReview = req.body;
  await BookService.postReview(id, reviewData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review posted successfully !',
  });
});

const editBook = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user = req.headers.authorization!;
  const bookData: Partial<IBook> = req.body;
  await BookService.editBook(id, user, bookData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Edited successfully !',
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user = req.headers.authorization!;
  await BookService.deleteBook(id, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted successfully !',
  });
});

export const BookController = {
  getAllBooks,
  getLatestBooks,
  getSingleBook,
  addNewBook,
  postReview,
  editBook,
  deleteBook,
};
