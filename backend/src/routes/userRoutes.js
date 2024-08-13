const express = require("express");

const {
  login,
  register,
  getusers,
  updateaccount,
} = require("../controllers/usercontroller");

const router = express.Router();
router.get("/users", getusers);
router.post("/register", register);
router.post("/login", login);
router.put("/updateuser", updateaccount);

module.exports = router;
