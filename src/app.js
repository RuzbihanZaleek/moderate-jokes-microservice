const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jokesRoutes = require("./routes/jokesRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../swagger.config");

const app = express();

// Swagger setup
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/moderateApi/auth", authRoutes);
app.use("/moderateApi/jokes", jokesRoutes);

module.exports = app;
