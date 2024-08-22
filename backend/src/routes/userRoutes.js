const express = require("express");
const {
  login,
  register,
  getusers,
  updateaccount,
  getUser,
  updateuserrole,
} = require("../controllers/usercontroller");

const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getusers);
router.get("/me", authenticateToken, getUser);
router.post("/register", register);
router.post("/login", login);
router.put("/update", authenticateToken, updateaccount); // Ensure this route exists
router.put("/update/:id", updateuserrole); // Ensure this route exists

module.exports = router;
