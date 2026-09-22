import express from 'express';
import {
  createPrintOrder,
  getAllPrintOrders,
  getPrintOrderById,
  updatePrintOrderStatus
} from '../controllers/printOrderController.js';

const router = express.Router();

router.route('/')
  .post(createPrintOrder)
  .get(getAllPrintOrders);

router.route('/:id')
  .get(getPrintOrderById);

router.route('/:id/status')
  .patch(updatePrintOrderStatus);

export default router;
