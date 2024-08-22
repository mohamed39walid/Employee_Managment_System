const express = require("express");
const {
  getallemployees,
  createemployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeecontroller");
const roleAuth = require("../middlewares/roleauth");

const router = express.Router();

// router.get("/", roleAuth(["admin", "manager"]), getallemployees);
router.get("/", getallemployees);
router.post("/", createemployee);
router.get("/get/:id", getEmployee);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
