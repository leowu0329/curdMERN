const express = require('express');
const router = express.Router();
const caseController = require('../controllers/case_Controller');
const { validate, caseValidationRules } = require('../middleware/validators');

// 創建新案例
router.post('/', caseValidationRules, validate, caseController.createCase);

// 獲取所有案例
router.get('/', caseController.getAllCases);

// 獲取單個案例
router.get('/:id', caseController.getCaseById);

// 更新案例
router.put('/:id', caseValidationRules, validate, caseController.updateCase);

// 刪除案例
router.delete('/:id', caseController.deleteCase);

module.exports = router;
