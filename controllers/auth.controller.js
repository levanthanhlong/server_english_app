const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const AuthController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create(username, hashedPassword);
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Error registering user!" });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      if (!user) return res.status(400).json({ error: "User not found!" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid password!" });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ message: "Login successful!", token });
    } catch (error) {
      res.status(500).json({ error: "Error logging in!" });
    }
  },
};

module.exports = AuthController;
