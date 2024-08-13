const express = require("express");
const { markAttendance, getAttendanceByEmployee, updateAttendance } = require("../controllers/attendancecontroller");
const roleAuth = require("../middlewares/roleauth");

const router = express.Router();


router.post("/attendance", roleAuth(["admin", "manager"]), markAttendance);

router.get("/attendance/:employee_id", roleAuth(["admin", "manager"]), getAttendanceByEmployee);


router.put("/attendance/:id", roleAuth(["admin", "manager"]), updateAttendance);

module.exports = router;
