const express = require("express");
const placesRouter = require("./places-route");
const usersRouter = require("./users-route");
const router = express.Router();

router.use("/places", placesRouter);
router.use("/users", usersRouter);

module.exports = router;
