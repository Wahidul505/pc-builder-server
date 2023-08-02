import express from 'express';
import { WishListController } from './wishList.controller';

const router = express.Router();

router.post('/:id', WishListController.addToWishList);
router.get('/', WishListController.getWishList);

export const WishListRoutes = router;
