import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IPcPart } from './pcPart.interface';
import { pcPartService } from './pcPart.service';

const getAllPcParts = catchAsync(async (req: Request, res: Response) => {
  const pcParts = await pcPartService.getAllPcParts();

  sendResponse<IPcPart[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PC parts retrieved successfully !',
    data: pcParts,
  });
});

const getRandomPcParts = catchAsync(async (req: Request, res: Response) => {
  const pcParts = await pcPartService.getRandomPcParts();

  sendResponse<IPcPart[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PC parts retrieved successfully !',
    data: pcParts,
  });
});

const getSinglePcPart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const pcPart = await pcPartService.getSinglePcPart(id);

  sendResponse<IPcPart>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PC part retrieved successfully !',
    data: pcPart,
  });
});

const getPcPartsByCategory = catchAsync(async (req: Request, res: Response) => {
  const { category } = req.params;
  const pcParts = await pcPartService.getPcPartsByCategory(category as string);

  sendResponse<IPcPart[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PC parts retrieved successfully !',
    data: pcParts,
  });
});

export const pcPartController = {
  getAllPcParts,
  getRandomPcParts,
  getSinglePcPart,
  getPcPartsByCategory,
};
