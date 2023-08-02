import express from 'express';
import { BookRoutes } from '../modules/book/book.route';
import { ReadingStatusRoutes } from '../modules/readingStatus/readingStatus.route';
import { WishListRoutes } from '../modules/wishList/wishList.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/wish-list',
    route: WishListRoutes,
  },
  {
    path: '/reading-status',
    route: ReadingStatusRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
