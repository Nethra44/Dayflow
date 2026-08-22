const express = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} = require("../controllers/employee.controller");
const { authenticateToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authenticateToken);

// HR only: List all employees
router.get("/", requireRole("hr", "admin"), getAllEmployees);

// Employee or HR: Get specific employee by ID
router.get("/:id", getEmployeeById);

// Employee/HR: Update profile fields
router.patch("/:id", updateEmployee);

module.exports = router;
