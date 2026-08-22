const express = require("express");
const { signup, signin, getMe } = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const { signupSchema, signinSchema } = require("../validators/auth.validator");

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/signin", validate(signinSchema), signin);
router.get("/me", authenticateToken, getMe);

module.exports = router;
