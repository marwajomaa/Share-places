const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./routes");
const HttpError = require("./models/http-error");

const app = express();

//Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

app.use("/api", router);

//Middleware that handles error for unsupported routes
app.use(async (req, res, next) => {
  const err = new HttpError("Could not find this route", 404);
  return next(err);
});

//Middleware that handles error for every request
app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ message: err.message || "AnUnKnown error has occurred" });
});

module.exports = app;
