const express = require("express");
const connectDB = require("./connection/dbConfig");
const roleAuth = require("./middlewares/roleauth");
const User = require("./models/user");
const cors = require('cors')
const app = express();
app.use(cors())
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes")
const meetingandtaskroutes = require("./routes/meetingandtaskRoutes")
const attendanceRoutes = require("./routes/attendanceRoutes")
require("dotenv").config()
connectDB();
app.use(express.json());

app.use("/users",userRoutes)
app.use("/employee",employeeRoutes)
app.use('/meeting-task',meetingandtaskroutes)
app.use('/attendance',attendanceRoutes)


app.listen(5000, () => {
  console.log("app is running on port 5000");
});
