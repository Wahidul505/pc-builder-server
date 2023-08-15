/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */
import { IPcPart } from './pcPart.interface';
import { PcPart } from './pcPart.model';

const getAllPcParts = async (): Promise<IPcPart[]> => {
  const pcParts = await PcPart.find();
  return pcParts;
};

const getRandomPcParts = async (): Promise<IPcPart[]> => {
  const pcParts = await PcPart.aggregate([{ $sample: { size: 6 } }]);
  return pcParts;
};

const getSinglePcPart = async (id: string): Promise<IPcPart | null> => {
  const pcPart = await PcPart.findById(id);
  return pcPart;
};

const getPcPartsByCategory = async (category: string): Promise<IPcPart[]> => {
  const pcPart = await PcPart.find({ category: category.toLowerCase() });
  return pcPart;
};

export const pcPartService = {
  getAllPcParts,
  getRandomPcParts,
  getSinglePcPart,
  getPcPartsByCategory,
};
