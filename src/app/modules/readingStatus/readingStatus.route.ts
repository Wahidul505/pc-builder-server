import express from 'express';
import { ReadingStatusController } from './readingStatus.controller';

const router = express.Router();

router.patch('/', ReadingStatusController.changeStatus);
router.get('/', ReadingStatusController.getStatus);

export const ReadingStatusRoutes = router;
