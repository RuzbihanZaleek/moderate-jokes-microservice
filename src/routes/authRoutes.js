const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check for valid credentials
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Generate JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
