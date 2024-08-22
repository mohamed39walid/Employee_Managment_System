const Task = require("../models/task");
const Meeting = require("../models/meeting");
const Employee = require("../models/employee");
const mongoose = require("mongoose");
require('dotenv').config();

const nodemailer = require('nodemailer');
const User = require("../models/user");


const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider here
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

exports.createTask = async (req, res) => {
  const { title, description, status, deadline, employee_id } = req.body;
  
  try {
    // Create and save the task
    const task = new Task({
      title,
      description,
      status,
      deadline,
      employee_id,
    });
    await task.save();
    const employee = await Employee.findById(employee_id).populate('user_id'); // Use populate


    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    if (!employee.user_id) {
      return res.status(404).json({ message: "User ID not found in employee document" });
    }
    
    const email = await employee.user_id.email;
    
    if (!email) {
      return res.status(404).json({ message: "Email not found in user document" });
    }
        
    // Send email to the employee
    const mailOptions = {
      from: "employeesystem@gmail.com", // Sender address
      to: email, // List of recipients
      subject: 'New Task Assigned', // Subject line
      html: `
      <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <table align="center" width="600" cellpadding="10" cellspacing="0" style="border-collapse: collapse; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background-color: #007BFF; color: #ffffff; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0;">New Task Assigned</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
              <p style="font-size: 16px; line-height: 1.5;">
                Hello <strong>${employee.user_id.name}</strong>,
              </p>
              <p style="font-size: 16px; line-height: 1.5;">
                A new task has been assigned to you:
              </p>
              <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 4px;">
                    <strong>Title:</strong> ${title}
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 4px; margin-top: 10px;">
                    <strong>Description:</strong> ${description}
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 4px; margin-top: 10px;">
                    <strong>Deadline:</strong> ${new Date(deadline).toLocaleDateString()}
                  </td>
                </tr>
              </table>
              <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
                Best regards,<br/>
                Your Company
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Validate task ID
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    // Fetch the task by its ID and populate the employee_id field
    const task = await Task.findById(taskId)
      .populate({
        path: "employee_id", // Populate the employee_id field
        select: "user_id", // Only include the user_id field
        populate: {
          path: "user_id", // Populate the user_id field within employee_id
          select: "name email", // Select only the name and email fields
        },
      })
      .exec();

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Structure the response to include employee details
    const taskWithEmployeeDetails = {
      ...task.toObject(),
      employee: {
        name: task.employee_id.user_id.name,
        email: task.employee_id.user_id.email,
      },
    };

    res.status(200).json(taskWithEmployeeDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, deadline, employee_id } = req.body;

    // Validate task ID
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    // Find the task by its ID and update it with the new data
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, deadline, employee_id },
      { new: true, runValidators: true } // Return the updated task and run validation
    )
      .populate({
        path: "employee_id", // Populate the employee_id field
        select: "user_id", // Only include the user_id field
        populate: {
          path: "user_id", // Populate the user_id field within employee_id
          select: "name email", // Select only the name and email fields
        },
      })
      .exec();

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Structure the response to include employee details
    const updatedTaskWithEmployeeDetails = {
      ...task.toObject(),
      employee: {
        name: task.employee_id.user_id.name,
        email: task.employee_id.user_id.email,
      },
    };

    res.status(200).json(updatedTaskWithEmployeeDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletetask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    res.status(200).json({ message: "task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    // Fetch all tasks and populate the employee_id field
    const tasks = await Task.find()
      .populate({
        path: "employee_id", // Populate the employee_id field
        select: "user_id", // Only include the user_id field
        populate: {
          path: "user_id", // Populate the user_id field within employee_id
          select: "name email", // Select only the name and email fields
        },
      })
      .exec();

    // Structure the response to include employee details
    const tasksWithEmployeeDetails = tasks.map((task) => ({
      ...task.toObject(),
      employee: {
        name: task.employee_id.user_id.name,
        email: task.employee_id.user_id.email,
      },
    }));

    res.status(200).json(tasksWithEmployeeDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTasksForEmployee = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.log("Invalid user ID")
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user_id = req.user.id
    const employee = await Employee.findOne({user_id: user_id});
    console.log(employee)

    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }

    const tasks = await Task.find({ employee_id: employee._id }).populate(
      "employee_id"
    );

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMeetingsForEmployee = async (req, res) => {
  try {
    // Ensure req.user.email is available
    if (!req.user || !req.user.email) {
      console.log("Invalid user email", req.user);
      return res.status(400).json({ message: "Invalid user email" });
    }

    const userEmail = req.user.email;

    // Fetch all meetings from the database
    const allMeetings = await Meeting.find();

    // Filter meetings based on participants' emails
    const meetingsForUser = allMeetings.filter(meeting =>
      meeting.participants.some(participant => participant.email === userEmail)
    );

    if (meetingsForUser.length === 0) {
      console.log("No meetings found for this user");
      return res.status(404).json({ message: "No meetings found for this user" });
    }

    res.status(200).json(meetingsForUser);
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
















exports.createMeeting = async (req, res) => {
  const { title, description, date, time, location, participants } = req.body;
  console.log('Request Data:', { title, description, date, time, location, participants });

  try {
    if (!Array.isArray(participants)) {
      return res.status(400).json({ message: "Participants must be an array of employee IDs." });
    }

    // Find valid participants and populate user_id
    const validParticipants = await Employee.find({
      _id: { $in: participants }
    }).populate('user_id'); // Populate the user_id field

    console.log('Valid Participants:', validParticipants);

    // Check if all provided participants are valid
    if (validParticipants.length !== participants.length) {
      return res.status(400).json({ message: "Some participant IDs are invalid." });
    }

    // Create a new meeting
    const meeting = new Meeting({
      title,
      description,
      date,
      time,
      location,
      participants,
    });

    await meeting.save();

    // Extract emails from valid participants
    const emails = validParticipants.map(employee => employee.user_id.email).filter(email => email);
    console.log('Extracted Emails:', emails);

    // Check if there are valid email addresses
    if (emails.length === 0) {
      return res.status(400).json({ message: "No valid email addresses found for participants." });
    }

    // Configure email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: emails, // List of recipients
      subject: 'New Meeting Scheduled', // Subject line
      html: `
        <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <table align="center" width="600" cellpadding="10" cellspacing="0" style="border-collapse: collapse; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="background-color: #007BFF; color: #ffffff; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0;">New Meeting Scheduled</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p style="font-size: 16px; line-height: 1.5;">
                  Hello,
                </p>
                <p style="font-size: 16px; line-height: 1.5;">
                  A new meeting has been scheduled:
                </p>
                <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
                  <tr>
                    <td style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 4px;">
                      <strong>Title:</strong> ${title}
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 4px; margin-top: 10px;">
                      <strong>Description:</strong> ${description}
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 4px; margin-top: 10px;">
                      <strong>Date:</strong> ${new Date(date).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 4px; margin-top: 10px;">
                      <strong>Time:</strong> ${time}
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 4px; margin-top: 10px;">
                      <strong>Location:</strong> ${location}
                    </td>
                  </tr>
                </table>
                <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
                  Best regards,<br/>
                  Your Company
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Send email notifications
    await transporter.sendMail(mailOptions);

    res.status(201).json(meeting);
  } catch (error) {
    console.error("Error creating meeting:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};












exports.getallmeetings = async (req, res) => {
  try {
    // Fetch all meetings and populate the participants field
    const meetings = await Meeting.find()
      .populate({
        path: "participants", // Populate the participants field
        select: "user_id", // Only include the user_id field
        populate: {
          path: "user_id", // Populate the user_id field within participants
          select: "name email", // Select only the name and email fields
        },
      })
      .exec();

    // Structure the response to include employee details
    const meetingsWithEmployeeDetails = meetings.map((meeting) => ({
      ...meeting.toObject(),
      participants: meeting.participants.map((participant) => ({
        name: participant.user_id.name,
        email: participant.user_id.email,
      })),
    }));

    res.status(200).json(meetingsWithEmployeeDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMeeting = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the meeting by its ID and populate the participants field
    const meeting = await Meeting.findById(id)
      .populate({
        path: "participants", // Populate the participants field
        select: "user_id", // Only include the user_id field
        populate: {
          path: "user_id", // Populate the user_id field within participants
          select: "name email", // Select only the name and email fields
        },
      })
      .exec();

    // Check if the meeting exists
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    // Structure the response to include employee details
    const meetingWithEmployeeDetails = {
      ...meeting.toObject(),
      participants: meeting.participants.map((participant) => ({
        name: participant.user_id.name,
        email: participant.user_id.email,
      })),
    };

    res.status(200).json(meetingWithEmployeeDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    const id = req.params.id;
    const meeting = await Meeting.findByIdAndDelete(id);
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).json({ message: "Server error" });
  }
};
