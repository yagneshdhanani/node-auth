const mongoose = require("mongoose");

const userShecma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("User", userShecma);
