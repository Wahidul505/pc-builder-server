import mongoose, { Schema, model } from 'mongoose';
import { IReadingStatus, ReadingStatusModel } from './readingStatus.interface';

const ReadingStatusSchema = new Schema<IReadingStatus, ReadingStatusModel>({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  bookList: {
    type: [
      {
        book: { type: mongoose.Types.ObjectId, required: true, ref: 'Book' },
        status: {
          type: String,
          required: true,
          enum: ['reading', 'will-read', 'finished'],
        },
      },
    ],
  },
});

export const ReadingStatus = model<IReadingStatus, ReadingStatusModel>(
  'ReadingStatus',
  ReadingStatusSchema
);
