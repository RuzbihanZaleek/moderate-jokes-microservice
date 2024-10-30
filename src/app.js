const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jokesRoutes = require("./routes/jokesRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/moderateApi/auth", authRoutes);
app.use("/moderateApi/jokes", jokesRoutes);

module.exports = app;
