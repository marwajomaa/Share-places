const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const {
  getPlacesByUSerId,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/places-controller");

//get specific place from it's id
router.get("/:id", getPlaceById);

//get specific place for specific user
router.get("/user/:uId", getPlacesByUSerId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
);

router.delete("/:pid", deletePlace);

module.exports = router;
