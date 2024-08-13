const express = require("express");
const { createTask, createMeeting, getTasksForEmployee, getMeetingsForEmployee } = require("../controllers/meetingandtaskcontroller");
const auth = require("../middlewares/auth");
const roleAuth = require("../middlewares/roleauth");

const router = express.Router();

router.post("/tasks", auth, roleAuth(["admin", "manager"]), createTask);
router.post("/meetings", auth, roleAuth(["admin", "manager"]), createMeeting);
router.get("/tasks/:id", auth, getTasksForEmployee);
router.get("/meetings/:id", auth, getMeetingsForEmployee);

module.exports = router;
