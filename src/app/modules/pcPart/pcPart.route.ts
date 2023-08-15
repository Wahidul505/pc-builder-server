import express from 'express';
import { pcPartController } from './pcPart.controller';

const router = express.Router();

router.get('/category/:category', pcPartController.getPcPartsByCategory);
router.get('/:id', pcPartController.getSinglePcPart);
router.get('/', pcPartController.getRandomPcParts);

export const PcPartRoutes = router;
