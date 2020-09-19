const express = require("express");

const router = express.Router();
const dummyData = [
  {
    id: "p1",
    address: "jfhlzf",
    decription: "sdjzhglkjgflFJBSL",
    creator: "u1",
  },
];

//get specific place from it's id
router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const place = dummyData.find((p) => p.id === id);

    if (!place) {
      const err = new Error("Could not find place for the provided id");
      err.code = 404;
      return next(err);
    }
    res.status(200).json({
      status: "success",
      message: `places middleware runs for ${id}`,
      data: place,
    });
  } catch (err) {
    console.log(err);
  }
});

//get specific place for specific user
router.get("/user/:uId", (req, res, next) => {
  try {
    const { uId } = req.params;
    const place = dummyData.find((p) => p.creator === uId);

    if (!place) {
      const err = new Error("Could not find place for the provided user id");
      err.code = 404;
      return next(err);
    }
    res.json({
      status: "success",
      message: `places middleware runs for ${uId}`,
      data: place,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
