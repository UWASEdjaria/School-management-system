import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const deposit = async (req, res) => {
  try {
    const { amount } = req.body;
    
    const user = await User.findById(req.user._id);
    user.feeBalance += amount;
    await user.save();

    await Transaction.create({
      userId: user._id,
      type: 'deposit',
      amount,
      description: 'Fee payment'
    });

    res.json({ message: 'Payment successful', balance: user.feeBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const withdraw = async (req, res) => {
  try {
    const { amount } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (user.feeBalance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.feeBalance -= amount;
    await user.save();

    await Transaction.create({
      userId: user._id,
      type: 'withdraw',
      amount,
      status: 'pending',
      description: 'Refund request'
    });

    res.json({ message: 'Refund request submitted', balance: user.feeBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ balance: user.feeBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort('-createdAt');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
