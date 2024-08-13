const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getusers = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.send("error in fetching data: ", error.message);
  }
};

exports.register = async (req, res) => {
  const { name, email, role } = req.body;
  const password = req.body.password;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already used" });
    const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
    const hashedpassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashedpassword, role });
    await user.save();
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error("error: ", error.message);
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
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateaccount = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) {
      const salt = await bcrypt.genSalt(10); 
      user.password = await bcrypt.hash(password, salt); 
    }

    
    await user.save();

    
    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    console.error("Error updating account:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

