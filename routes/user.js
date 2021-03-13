const express = require("express");
const { verifyToken } = require("../middleware/jwtToken");

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  const { name, id } = req.user;
  res.send({ name, id });
});

module.exports = router;
