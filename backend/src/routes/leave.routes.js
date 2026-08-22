const express = require("express");
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  reviewLeave,
} = require("../controllers/leave.controller");
const { authenticateToken } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authenticateToken);

// Employee actions
router.post("/", applyLeave);
router.get("/me", getMyLeaves);

// HR actions
router.get("/", requireRole("hr", "admin"), getAllLeaves);
router.patch("/:id/review", requireRole("hr", "admin"), reviewLeave);

module.exports = router;
