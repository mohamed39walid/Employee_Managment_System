const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Leave"],
        required: true
    }
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
