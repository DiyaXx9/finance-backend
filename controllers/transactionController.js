import Transaction from "../models/Transaction.js";

// ➕ Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;

    // ✅ Validation
    if (!amount || !type || !category) {
      return res.status(400).json({
        message: "Amount, type, and category are required",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        message: "Type must be income or expense",
      });
    }

    const transaction = await Transaction.create({
      amount,
      type,
      category,
      date,
      note,
      user: req.user._id,
    });

    res.status(201).json(transaction);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 5, type, category } = req.query;

    const skip = (page - 1) * limit;

    let filter = {
      user: req.user._id,
    };

    if (type) filter.type = type;
    if (category) filter.category = category;

    const transactions = await Transaction.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ date: -1 });

    res.json({
      page: Number(page),
      limit: Number(limit),
      count: transactions.length,
      transactions,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update Transaction
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Ensure user owns it
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await transaction.deleteOne();

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};