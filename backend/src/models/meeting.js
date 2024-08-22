const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // Use String or Date depending on how you handle time
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }], // Reference to Employee
  },
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
