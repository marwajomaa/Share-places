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
  if (err.isBoom) {
    // for boom errors
    res.status(err.output.statusCode || 500);
    console.log(err.message, err.output.statusCode, "------------");
  } else {
    res.status(err.code || 500);
    console.log(err.code, "............");
  }
  console.log(err.message);
  res.json({ error: err.message || "AnUnKnown error has occurred" });
});

module.exports = app;
