const express = require("express");
const { createTask, createMeeting, getTasksForEmployee, getMeetingsForEmployee, getallmeetings, getAllTasks, getTask, updateTask, deletetask, getMeeting, updateMeeting, deleteMeeting } = require("../controllers/meetingandtaskcontroller");
const roleAuth = require("../middlewares/roleauth");
const {authenticateToken} = require('../middlewares/auth')
const mongoose = require("mongoose")


const router = express.Router();

router.post("/tasks", createTask);
router.get("/employeetasks",authenticateToken,getTasksForEmployee)
router.put("/tasks/:id",updateTask)
router.delete("/tasks/:id",deletetask)
router.get("/tasks/:id",  getTask);
router.get("/tasks",getAllTasks)



router.post("/meetings", createMeeting);
router.get("/employeemeetings", getMeetingsForEmployee);
router.get("/meetings",getallmeetings)
router.get("/meetings/:id",getMeeting)
router.delete("/meetings/:id",deleteMeeting)



module.exports = router;
