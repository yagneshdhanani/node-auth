const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { registerUser, loginUser } = require("../middleware/validate");

const router = express.Router();

// creating a new user
router.post("/register", async (req, res) => {
  const { error } = registerUser(req.body);

  // Validating a user object
  if (error) return res.status(400).send({ message: error.message });

  // Checking for unique email
  const isExist = await User.findOne({ email: req.body.email });
  if (isExist) return res.status(400).send({ message: "Email already used." });

  // Hashing password
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Creating a user object
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const { _id } = await user.save();
    res.send({ _id });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// login the user
router.post("/login", async (req, res) => {
  const { error } = loginUser(req.body);

  // Validating a user object
  if (error) return res.status(400).send({ message: error.message });

  // Get User email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send({ message: "Email not found" });

  // Compare password
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).send({ message: "Invalid password" });

  try {
    const jsonToken = jwt.sign(
      { id: user._id, name: user.name },
      process.env.TOKEN_SECRET
    );
    return res
      .header("x-auth-token", jsonToken)
      .send({ messgae: "Yeah, you have accessed" });
  } catch (error) {
    return res.status(400).send({ error: "Error genrating token" });
  }
});

module.exports = router;
