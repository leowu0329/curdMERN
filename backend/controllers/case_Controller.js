const Case = require('../models/Case');

// 創建新案例
exports.createCase = async (req, res) => {
  try {
    const newCase = new Case(req.body);
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 獲取所有案例
exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 獲取單個案例
exports.getCaseById = async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) {
      return res.status(404).json({ message: '找不到該案例' });
    }
    res.json(caseItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 更新案例
exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCase) {
      return res.status(404).json({ message: '找不到該案例' });
    }
    res.json(updatedCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 刪除案例
exports.deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) {
      return res.status(404).json({ message: '找不到該案例' });
    }
    res.json({ message: '案例已刪除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
