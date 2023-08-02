import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  addedBy: string;
  reviews: string[];
};

export type IBookReview = {
  review: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
