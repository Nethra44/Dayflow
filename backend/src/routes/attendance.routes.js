const express = require("express");
const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
} = require("../controllers/attendance.controller");
const { authenticateToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authenticateToken);

// Employee actions
router.post("/check-in", checkIn);
router.post("/check-out", checkOut);
router.get("/me", getMyAttendance);

// HR actions
router.get("/all", requireRole("hr", "admin"), getAllAttendance);

module.exports = router;
