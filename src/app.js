const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jokesRoutes = require("./routes/jokesRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/moderate/jokes", jokesRoutes);

module.exports = app;
