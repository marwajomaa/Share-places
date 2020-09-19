const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    status: "success",
    message: " users middleware runs",
  });
});

module.exports = router;
