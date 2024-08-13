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

router.get("/", roleAuth(["admin", "manager"]), getallemployees);
router.post("/", createemployee);
router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
