import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IReadingStatus, IStatus } from './readingStatus.interface';
import { ReadingStatusService } from './readingStatus.service';

const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const { id, status } = req.query;
  const user = req.headers.authorization;
  await ReadingStatusService.changeStatus(
    id as string,
    status as IStatus,
    user as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Current book status: ${status}`,
  });
});
const getStatus = catchAsync(async (req: Request, res: Response) => {
  const user = req.headers.authorization;
  const data = await ReadingStatusService.getStatus(user as string);
  sendResponse<IReadingStatus>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Book list retrieved successfully!`,
    data,
  });
});

export const ReadingStatusController = { changeStatus, getStatus };
