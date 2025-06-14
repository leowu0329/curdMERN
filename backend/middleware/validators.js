const { body, validationResult } = require('express-validator');

// 驗證結果處理中間件
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 案例驗證規則
const caseValidationRules = [
  // 首件巡檢
  body('inspectionType')
    .isIn(['首件', '巡檢'])
    .withMessage('首件巡檢必須是「首件」或「巡檢」'),

  // 內/外銷
  body('marketType')
    .isIn(['內銷', '外銷'])
    .withMessage('內/外銷必須是「內銷」或「外銷」'),

  // 客戶
  body('customer')
    .notEmpty()
    .withMessage('客戶不能為空')
    .isString()
    .withMessage('客戶必須是字串'),

  // 部門
  body('department')
    .isIn(['', '塑膠射出課', '射出加工組', '機械加工課'])
    .withMessage('部門必須是有效的選項'),

  // 日期
  body('date')
    .notEmpty()
    .withMessage('日期不能為空')
    .isDate()
    .withMessage('日期格式無效'),

  // 時間
  body('time')
    .notEmpty()
    .withMessage('時間不能為空')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('時間格式必須是 HH:mm'),

  // 製令編號
  body('workOrder').optional().isString().withMessage('製令編號必須是字串'),

  // 作業人員
  body('operator').optional().isString().withMessage('作業人員必須是字串'),

  // 圖面版次
  body('drawingVersion')
    .optional()
    .isString()
    .withMessage('圖面版次必須是字串'),

  // 品號
  body('productNumber')
    .notEmpty()
    .withMessage('品號不能為空')
    .isString()
    .withMessage('品號必須是字串'),

  // 品名
  body('productName')
    .notEmpty()
    .withMessage('品名不能為空')
    .isString()
    .withMessage('品名必須是字串'),

  // 數量
  body('quantity')
    .notEmpty()
    .withMessage('數量不能為空')
    .isInt({ min: 0 })
    .withMessage('數量必須是非負整數'),

  // 巡檢員
  body('inspector')
    .isIn(['', '吳小男', '謝小宸', '黃小瀅', '蔡小函', '徐小棉', '杜小綾'])
    .withMessage('巡檢員必須是有效的選項'),

  // 不良分類
  body('defectCategory')
    .optional()
    .isIn([
      '',
      '無圖面',
      '圖物不符',
      '無工單',
      '無檢驗表單',
      '尺寸NG',
      '外觀NG',
    ])
    .withMessage('不良分類必須是有效的選項'),

  // 不良狀況
  body('defectDescription')
    .optional()
    .isString()
    .withMessage('不良狀況必須是字串'),

  // 處置對策
  body('solution').optional().isString().withMessage('處置對策必須是字串'),

  // 檢驗工時
  body('inspectionHours')
    .optional()
    .isFloat({ min: 0, max: 24 })
    .withMessage('檢驗工時必須是 0-24 之間的小數'),
];

module.exports = {
  validate,
  caseValidationRules,
};
