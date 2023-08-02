import { Model, Types } from 'mongoose';
import { IBook } from '../book/book.interface';

export type IStatus = 'reading' | 'will-read' | 'finished';

export type IReadingStatusBook = {
  book: Types.ObjectId | IBook;
  status: IStatus;
};

export type IReadingStatus = {
  user: string;
  bookList: IReadingStatusBook[];
};

export type ReadingStatusModel = Model<IReadingStatus, Record<string, unknown>>;
