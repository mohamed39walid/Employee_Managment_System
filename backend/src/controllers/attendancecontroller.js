const Attendance = require("../models/attendance");

exports.markAttendance = async (req, res) => {
    const { employee_id, status } = req.body;
    try {
        const attendance = new Attendance({ employee_id, status });
        await attendance.save();
        res.status(201).json(attendance);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAttendanceByEmployee = async (req, res) => {
    try {
        const attendance = await Attendance.find({ employee_id: req.params.employee_id });
        if (!attendance) return res.status(404).json({ message: "No attendance record found" });
        res.status(200).json(attendance);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!attendance) return res.status(404).json({ message: "Attendance record not found" });
        res.status(200).json(attendance);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};
