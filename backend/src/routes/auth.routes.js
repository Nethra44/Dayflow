const express = require("express");
const { signup, signin, getMe } = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", authenticateToken, getMe);

module.exports = router;
