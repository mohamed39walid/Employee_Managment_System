const Employee = require("../models/employee");
const User = require("../models/user");

exports.createemployee = async (req, res) => {
  const { user_id, salary, position, contactnumber, address, status } = req.body;
  console.log("Creating employee with data:", req.body);
  try {
    const user = await User.findById(user_id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const employee = new Employee({
      user_id,
      salary,
      position,
      contactnumber,
      address,
      status,
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.error("Error creating employee:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getallemployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("user_id").exec();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("user_id");
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user_id");
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error updating employee:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    console.error("Error deleting employee:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
