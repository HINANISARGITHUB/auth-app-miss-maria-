const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hash,
    });

    await user.save();

    res.json({ message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({ message: "Login successful" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;