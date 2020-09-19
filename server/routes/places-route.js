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
      return res
        .status(404)
        .json({ status: "fail", message: "NO Places Found" });
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
  const { uId } = req.params;
  const place = dummyData.find((p) => p.creator === uId);
  res.json({
    status: "success",
    message: `places middleware runs for ${uId}`,
    data: place,
  });
});

module.exports = router;
