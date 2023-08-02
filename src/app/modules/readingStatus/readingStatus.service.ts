/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Book } from '../book/book.model';
import { IReadingStatus, IStatus } from './readingStatus.interface';
import { ReadingStatus } from './readingStatus.model';

const changeStatus = async (
  id: string,
  status: IStatus,
  user: string
): Promise<void> => {
  if (id && user && status) {
    if (
      status === 'reading' ||
      status === 'will-read' ||
      status === 'finished'
    ) {
      const isUserExist = await ReadingStatus.findOne({ user: user }).lean();
      const isBookExist = await Book.findById(id).lean();
      if (!isBookExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Book does not exist');
      } else if (isBookExist && !isUserExist) {
        const statusData = {
          user: user,
          bookList: [{ book: isBookExist._id, status }],
        };
        await ReadingStatus.create(statusData);
      } else if (isBookExist && isUserExist) {
        const bookExistOnStatus = isUserExist.bookList.find(
          book => book.book.toString() === isBookExist._id.toString()
        );

        if (bookExistOnStatus) {
          const restBooks = isUserExist.bookList.filter(
            book => book.book.toString() !== isBookExist._id.toString()
          );
          const updatedBooks = [...restBooks, { ...bookExistOnStatus, status }];
          await ReadingStatus.findOneAndUpdate(
            { user: user },
            { user, bookList: updatedBooks }
          );
        } else {
          const newBook = { book: isBookExist._id, status };

          const updatedBooks = [...isUserExist.bookList, newBook];

          await ReadingStatus.findOneAndUpdate(
            { user: user },
            { user, bookList: updatedBooks }
          );
        }
      }
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Status should be "reading", "will-read" or "finished"'
      );
    }
  }
};

const getStatus = async (user: string): Promise<IReadingStatus> => {
  const data = await ReadingStatus.findOne({ user: user }).populate({
    path: 'bookList',
    populate: [
      {
        path: 'book',
      },
    ],
  });
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  return data;
};

export const ReadingStatusService = {
  changeStatus,
  getStatus,
};
