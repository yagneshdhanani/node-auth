const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send({ message: "Access denied." });

  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = {
  verifyToken,
};
