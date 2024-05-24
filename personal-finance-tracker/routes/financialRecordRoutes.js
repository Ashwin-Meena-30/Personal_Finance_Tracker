const express = require("express");
const {
  getFinancialRecords,
  createFinancialRecord,
  updateFinancialRecord,
  deleteFinancialRecord,
} = require("../controllers/financialRecordController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const router = express.Router();
router.get("/", authenticateToken, getFinancialRecords);
router.post("/", authenticateToken, createFinancialRecord);
router.put("/:id", authenticateToken, updateFinancialRecord);
router.delete("/:id", authenticateToken, deleteFinancialRecord);

module.exports = router;
