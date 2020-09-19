const express = require("express");

const router = express.Router();

const {
  getPlaceByUSerId,
  getPlaceById,
  createPlace,
} = require("../controllers/places-controller");

//get specific place from it's id
router.get("/:id", getPlaceById);

//get specific place for specific user
router.get("/user/:uId", getPlaceByUSerId);

router.post("/", createPlace);

module.exports = router;
