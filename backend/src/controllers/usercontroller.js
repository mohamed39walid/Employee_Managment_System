const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getusers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error in fetching data:", error.message);
    res.status(500).json({ message: "Error in fetching data" });
  }
};

exports.getUser = async (req, res) => {
  try {
    // Check if req.user is set and has an id
    if (!req.user || !req.user.id) {
      console.error("User not found in request:", req.user);
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(req.user.id).select("-password -role");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.register = async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already used" });

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashedpassword, role });
    await user.save();

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "No user with this email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateaccount = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Ensure req.user.id is available
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Find user by ID (from req.user.id)
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ message: "Server error" });
  }
};




exports.updateuserrole = async (req, res) => {
  try {
    const userId = req.params.id; // Correctly extract userId from req.params
    const { role } = req.body;

    // Ensure role is provided and is a valid string
    if (!role || typeof role !== 'string') {
      return res.status(400).json({ message: 'Role is required and must be a string' });
    }

    // Find and update the user by ID
    const user = await User.findByIdAndUpdate(
      userId,
      { role }, // Update the role field only
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error updating user role:", error.message); // Improved error logging
    res.status(500).json({ message: 'Server error' });
  }
};

