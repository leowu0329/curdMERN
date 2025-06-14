require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const connectDB = require('./config/db');
const caseRoutes = require('./routes/cases');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

// 連接數據庫
connectDB();

// 安全 HTTP 頭部
app.use(helmet());

// 啟用 CORS
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.FRONTEND_URL
      : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 小時
};
app.use(cors(corsOptions));

// 啟用 CORS
app.use(cors(corsOptions));

// 測試路由
app.get('/', (req, res) => {
  res.send('backend Test OK');
});

// 解析 JSON 請求體
app.use(express.json());

// 限制請求速率
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 分鐘
  max: 100, // 限制每個 IP 在 windowMs 內最多 100 個請求
  message: '請求次數過多，請稍後再試',
});
app.use('/api', limiter);

// 防止 NoSQL 注入
app.use(mongoSanitize());

// 防止 XSS 攻擊
app.use(xss());

// 防止 HTTP 參數污染
app.use(hpp());

// 解析 JSON 請求體
app.use(express.json({ limit: '10kb' })); // 限制請求體大小

// API 路由
app.use('/api/cases', caseRoutes);

// 處理未找到的路由
app.use(notFoundHandler);

// 錯誤處理中間件
app.use(errorHandler);

// 啟動服務器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
