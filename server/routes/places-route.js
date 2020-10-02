const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const {
  getPlacesByUSerId,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/places-controller");

//get specific place from it's id
router.get("/:pId", getPlaceById);

//get specific place for specific user
router.get("/user/:uId", getPlacesByUSerId);

//check auth for the protected routes
router.use(checkAuth);

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
  "/:pId",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
);

router.delete("/:pId", deletePlace);

module.exports = router;
