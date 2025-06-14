require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const caseRoutes = require('./routes/case');

const app = express();
const port = process.env.PORT || 5000;

// 連接數據庫
connectDB();

// 啟用 CORS
app.use(cors());

// 解析 JSON 請求體
app.use(express.json());

// 測試路由
app.get('/', (req, res) => {
  res.send('backend Test OK');
});

// API 路由
app.use('/api/cases', caseRoutes);

// 啟動服務器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
