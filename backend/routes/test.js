const express = require('express');
const router = express.Router();
const Test = require('../models/Test');

// 創建測試數據
router.post('/', async (req, res) => {
  try {
    const test = new Test({
      name: req.body.name,
      description: req.body.description,
    });
    const savedTest = await test.save();
    res.json(savedTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 獲取所有測試數據
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
