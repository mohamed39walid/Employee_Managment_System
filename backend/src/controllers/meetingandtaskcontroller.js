const Task = require("../models/task");
const Meeting = require("../models/meeting");

exports.createTask = async (req, res) => {
  const { title, description, deadline, employee_id } = req.body;
  try {
    const task = new Task({
      title,
      description,
      deadline,
      admin_id: req.user._id,
      employee_id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createMeeting = async (req, res) => {
  const { title, description, date, time, location, employee_id } = req.body;
  try {
    const meeting = new Meeting({
      title,
      description,
      date,
      time,
      location,
      manager_id: req.user._id,
      employee_id,
    });
    await meeting.save();
    res.status(201).json(meeting);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTasksForEmployee = async (req, res) => {
  try {
    const tasks = await Task.find({ employee_id: req.params.id }).populate(
      "admin_id",
      "name"
    );
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMeetingsForEmployee = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      employee_id: req.params.id,
    }).populate("manager_id", "name");
    res.status(200).json(meetings);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
