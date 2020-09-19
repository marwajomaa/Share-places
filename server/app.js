const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./routes");

const app = express();

//Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/public`));

app.use("/api", router);

module.exports = app;
