const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Import Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

// Connct to DB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to DB");
});

// Creating express app
const app = express();
const PORT = process.env.PORT || 3000;

// Parsing json body object
app.use(express.json());

// Routers
app.use("/api/users", authRoute);
app.use("/api/account", userRoute);

// Listing app
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
