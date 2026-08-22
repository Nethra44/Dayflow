const express = require("express");
const {
  getMyPayroll,
  getAllPayroll,
  updatePayroll,
} = require("../controllers/payroll.controller");
const { authenticateToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authenticateToken);

// Employee route
router.get("/me", getMyPayroll);

// HR routes
router.get("/", requireRole("hr", "admin"), getAllPayroll);
router.patch("/:employeeId", requireRole("hr", "admin"), updatePayroll);

module.exports = router;
