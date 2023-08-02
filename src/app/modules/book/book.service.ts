/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBook, IBookReview } from './book.interface';
import { Book } from './book.model';

const getAllBooks = async (): Promise<IBook[]> => {
  const books = await Book.find();
  return books;
};

const getLatestBooks = async (): Promise<IBook[]> => {
  const books = await Book.find().sort({ $natural: -1 }).limit(10);
  return books;
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const book = Book.findById(id);
  return book;
};

const addNewBook = async (payload: IBook): Promise<void> => {
  if (payload) {
    await Book.create(payload);
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
};

const postReview = async (id: string, payload: IBookReview): Promise<void> => {
  const existingReviews = await Book.findById(id, { reviews: 1 });
  const newReviews = existingReviews?.reviews
    ? [...existingReviews.reviews, payload.review]
    : [payload.review];
  if (payload && id) {
    await Book.findOneAndUpdate({ _id: id }, { reviews: newReviews });
  }
};

const editBook = async (
  id: string,
  user: string,
  payload: Partial<IBook>
): Promise<void> => {
  const book = await Book.findOne({ _id: id, addedBy: user });
  if (!book) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to edit the book'
    );
  }
  if (book && payload) {
    await Book.findOneAndUpdate({ _id: id }, payload);
  }
};

const deleteBook = async (id: string, user: string): Promise<void> => {
  const book = await Book.findOne({ _id: id, addedBy: user });
  if (!book) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete the book'
    );
  }
  await Book.findOneAndDelete({ _id: id });
};

export const BookService = {
  getAllBooks,
  getLatestBooks,
  getSingleBook,
  addNewBook,
  postReview,
  editBook,
  deleteBook,
};
