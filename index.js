const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const env = require("dotenv");

env.config();

const connectToDB = require("./config/database");
const projectRoute = require("./routes/projectRoute");
const skillRoute = require("./routes/skillRoute");

const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/globalErrorMiddleware");

// Database
connectToDB();

// Express
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "assets")));
app.use(globalError);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`✅ ${process.env.NODE_ENV} mode is on`);
} else {
  console.log(`✅ ${process.env.NODE_ENV} mode is on`);
}

// Routes
app.use(`${process.env.BASE_URL}/projects`, projectRoute);
app.use(`${process.env.BASE_URL}/skills`, skillRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`There is no rout with this url ${req.originalUrl}`, 400));
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ listening on localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting down...");
    process.exit(1);
  });
});
