import express from 'express';
import { deposit, withdraw, getBalance, getTransactions } from '../controllers/feeController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/deposit', protect, deposit);
router.post('/withdraw', protect, withdraw);
router.get('/balance', protect, getBalance);
router.get('/transactions', protect, getTransactions);

export default router;
