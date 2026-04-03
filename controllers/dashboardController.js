import Transaction from "../models/Transaction.js";

// 📊 Dashboard Summary
export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ user: userId });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") totalIncome += t.amount;
      else totalExpense += t.amount;
    });

    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance,
      totalTransactions: transactions.length,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(stats);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMonthlyStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    res.json(stats);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};