import express from 'express';
import { PcPartRoutes } from '../modules/pcPart/pcPart.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/pc-part',
    route: PcPartRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
